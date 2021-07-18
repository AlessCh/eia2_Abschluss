namespace footballSimulator {
  const canvasGround = document.getElementById(
    "playground"
  ) as HTMLCanvasElement;
  const playerInfo = document.getElementById("playerinfo") as HTMLFormElement;
  const gameDetails = document.getElementById("gamedetails") as HTMLFormElement;
  //const playerStats = document.getElementById("playerstats") as HTMLFormElement;
  const teamOne = document.getElementById("teamone") as HTMLFormElement;
  const teamTwo = document.getElementById("teamtwo") as HTMLFormElement;
  const ground = canvasGround.getContext("2d")!;

  let gameStarted = false;

  const startGameButton = document.getElementById(
    "starter"
  ) as HTMLButtonElement;
  const resetGameButton = document.getElementById("reset") as HTMLButtonElement;

  const groundWidth = canvasGround.width;
  const groundHeight = canvasGround.height;

  var movable: Movable[] = [];
  let ballOwnedByPlayer = false;
  let playerWithTheBall: Player | undefined;

  let teamOneScore: number = 0;
  let teamTwoScore: number = 0;

  export interface change {
    jersy: number;
    team: string;
  }

  export let players: Player[] = [];

  export let adds: number = 0;
  export let dels: Array<change> = [];

  const leftGoal = [
    new Coordinate(50, 330),
    new Coordinate(50, 410),
    new Coordinate(10, 330),
    new Coordinate(10, 410),
  ];

  const rightGoal = [
    new Coordinate(1110, 330),
    new Coordinate(1110, 410),
    new Coordinate(1150, 330),
    new Coordinate(1150, 410),
  ];

  const standardPositionsTeamOne: Coordinate[] = [
    new Coordinate((groundWidth / 110) * 10, groundHeight / 2 + 30),
    new Coordinate((groundWidth / 110) * 15, (groundHeight / 75) * 17),
    new Coordinate((groundWidth / 110) * 15, (groundHeight / 75) * 65),
    new Coordinate((groundWidth / 110) * 32, groundHeight / 2 + 30),
    new Coordinate((groundWidth / 110) * 43, groundHeight / 2 - 110),
    new Coordinate((groundWidth / 110) * 43, groundHeight / 2 + 180),
    new Coordinate((groundWidth / 110) * 57, groundHeight / 2 + 125),
    new Coordinate((groundWidth / 110) * 75, (groundHeight / 75) * 15),
    new Coordinate((groundWidth / 110) * 75, (groundHeight / 75) * 68),
    new Coordinate((groundWidth / 110) * 88.5, groundHeight / 2 - 50),
    new Coordinate((groundWidth / 110) * 88.5, groundHeight / 2 + 110),
  ];

  const standardPositionsTeamTwo: Coordinate[] = [
    new Coordinate((groundWidth / 110) * 100, groundHeight / 2 + 30),
    new Coordinate((groundWidth / 110) * 78, groundHeight / 2 + 30),
    new Coordinate((groundWidth / 110) * 67, groundHeight / 2 - 110),
    new Coordinate((groundWidth / 110) * 67, groundHeight / 2 + 180),
    new Coordinate((groundWidth / 110) * 54, groundHeight / 2 - 60),
    new Coordinate((groundWidth / 110) * 35, (groundHeight / 75) * 68),
    new Coordinate((groundWidth / 110) * 21.5, groundHeight / 2 + 110),
    new Coordinate((groundWidth / 110) * 21.5, groundHeight / 2 - 50),
    new Coordinate((groundWidth / 110) * 35, (groundHeight / 75) * 15),
    new Coordinate((groundWidth / 110) * 95, (groundHeight / 75) * 65),
    new Coordinate((groundWidth / 110) * 95, (groundHeight / 75) * 17),
  ];

  var jerseyColorTeamOne: string;
  var jerseyColorTeamTwo: string;
  var speedTeamOneMin: number;
  var speedTeamOneMax: number;
  var speedTeamTwoMin: number;
  var speedTeamTwoMax: number;
  var precisionTeamOneMin: number;
  var precisionTeamOneMax: number;
  var precisionTeamTwoMin: number;
  var precisionTeamTwoMax: number;

  let animationInProgress = true;

  drawField();
  setupReferees();
  setupBall();
  let playerAnimator = window.setInterval(updateUI, 100);

  function setupTeams(
    teamOneColor: string = "#00ffaa",
    teamTwoColor: string = "#d703fc",
    teamOneplayerPrecision: number[] = [10, 10],
    teamOneplayerSpeed: number[] = [10, 10],
    teamTwoplayerPrecision: number[] = [10, 10],
    teamTwoplayerSpeed: number[] = [10, 10]
  ): void {
    setupTeam(
      "Team One",
      standardPositionsTeamOne,
      teamOneColor,
      teamOneplayerPrecision,
      teamOneplayerSpeed
    );
    setupTeam(
      "Team Two",
      standardPositionsTeamTwo,
      teamTwoColor,
      teamTwoplayerPrecision,
      teamTwoplayerSpeed
    );
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function setupTeam(
    teamName: string,
    positions: Coordinate[],
    jerseyColor: string,
    playerPrecision: number[],
    playerSpeed: number[]
  ): void {
    var players: Player[] = [];

    for (let i = 1; i <= 11; i++) {
      const player = new Player(
        positions[i - 1],
        Object.assign({}, positions[i - 1]),
        teamName,
        i,
        false,
        jerseyColor,
        randomIntFromInterval(playerSpeed[0], playerSpeed[1]),
        randomIntFromInterval(playerPrecision[0], playerPrecision[1])
      );

      players.push(player);
    }

    players = players.filter(changes);

    players.forEach((player) => {
      console.log(player)
      player.draw();
      movable.push(player);
    });
  }

  function setupReferees(): void {
    for (let i = 0; i < 2; i++) {
      const lineReferee = new Referee(
        i === 0
          ? new Coordinate(groundWidth / 2, (groundHeight / 75) * 76.5)
          : new Coordinate(groundWidth / 2, (groundHeight / 75) * 6.5),
        RefereeRole.LINE_REF
      );
      lineReferee.draw();
      movable.push(lineReferee);
    }
    const groundReferee = new Referee(
      new Coordinate((groundWidth / 110) * 60, groundHeight / 2 + 30),
      RefereeRole.GROUND_REF
    );
    groundReferee.draw();
    movable.push(groundReferee);
  }

  function setupBall(): void {
    const ball = new Ball(
      new Coordinate(groundWidth / 2, groundHeight / 2),
      undefined
    );
    ball.draw();
    movable.push(ball);
  }

  canvasGround.addEventListener("click", kickBall);
  startGameButton.addEventListener("click", startGame);
  resetGameButton.addEventListener("click", resetGame);
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    console.log(event);
    if ("Escape" === key && gameStarted) {
      resetGame();
    } else if ("Enter" === key && !gameStarted) {
      startGame();
    }
  });

  function startGame(): void {
    const jerseyColorTeamOneInput = document.getElementById(
      "color-team-one"
    ) as HTMLInputElement;
    const jerseyColorTeamTwoInput = document.getElementById(
      "color-team-two"
    ) as HTMLInputElement;
    const precisionTeamOneInputMin = document.getElementById(
      "team-one-precision-min"
    ) as HTMLInputElement;
    const precisionTeamOneInputMax = document.getElementById(
      "team-one-precision-max"
    ) as HTMLInputElement;
    const precisionTeamTwoInputMin = document.getElementById(
      "team-two-precision-min"
    ) as HTMLInputElement;
    const precisionTeamTwoInputMax = document.getElementById(
      "team-two-precision-max"
    ) as HTMLInputElement;
    const speedTeamOneInputMin = document.getElementById(
      "team-one-speed-min"
    ) as HTMLInputElement;
    const speedTeamOneInputMax = document.getElementById(
      "team-one-speed-max"
    ) as HTMLInputElement;
    const speedTeamTwoInputMin = document.getElementById(
      "team-two-speed-min"
    ) as HTMLInputElement;
    const speedTeamTwoInputMax = document.getElementById(
      "team-two-speed-max"
    ) as HTMLInputElement;

    jerseyColorTeamOne = jerseyColorTeamOneInput.value;
    jerseyColorTeamTwo = jerseyColorTeamTwoInput.value;
    speedTeamOneMin = Number(speedTeamOneInputMin.value);
    speedTeamOneMax = Number(speedTeamOneInputMax.value);
    speedTeamTwoMin = Number(speedTeamTwoInputMin.value);
    speedTeamTwoMax = Number(speedTeamTwoInputMax.value);
    precisionTeamOneMin = Number(precisionTeamOneInputMin.value);
    precisionTeamOneMax = Number(precisionTeamOneInputMax.value);
    precisionTeamTwoMin = Number(precisionTeamTwoInputMin.value);
    precisionTeamTwoMax = Number(precisionTeamTwoInputMax.value);

    setupTeams(
      jerseyColorTeamOne,
      jerseyColorTeamTwo,
      [speedTeamOneMin, speedTeamOneMax],
      [speedTeamTwoMin, speedTeamTwoMax],
      [precisionTeamOneMin, precisionTeamOneMax],
      [precisionTeamTwoMin, precisionTeamTwoMax]
    );

    playerInfo.classList.toggle("hidden");
    gameDetails.classList.toggle("hidden");
    //playerStats.classList.toggle("hidden");
    teamOne.classList.toggle("hidden");
    teamTwo.classList.toggle("hidden");
    canvasGround.classList.toggle("hidden");
    startGameButton.classList.toggle("hidden");
    resetGameButton.classList.toggle("hidden");

    setupPlayerStats();
    setupChangesBtns();

    gameStarted = true;
  }

  function resetGame(): void {
    window.location.reload();
  }

  function insideGoal(coordinate: Coordinate, borders: Coordinate[]): boolean {
    const xBoarders = new Set();
    const yBoarders = new Set();

    borders.forEach((coord) => {
      xBoarders.add(coord.x);
      yBoarders.add(coord.y);
    });

    const xValueArr: number[] = Array.from(xBoarders) as number[];
    xValueArr.sort((a: number, b: number) => a - b);
    const yValueArr: number[] = Array.from(yBoarders) as number[];
    yValueArr.sort((a: number, b: number) => a - b);

    if (
      coordinate.x >= xValueArr[0] &&
      coordinate.x <= xValueArr[1] &&
      coordinate.y >= yValueArr[0] &&
      coordinate.y <= yValueArr[1]
    ) {
      return true;
    }
    return false;
  }

  function kickBall(event: MouseEvent): void {
    const rect = canvasGround.getBoundingClientRect() as DOMRect;
    const x =
      event.clientX -
      rect.left +
      (Math.random() > 0.5
        ? Math.abs(
          playerWithTheBall?.precision
            ? 100 - playerWithTheBall?.precision ?? 0 * 1
            : 0
        )
        : Math.abs(
          playerWithTheBall?.precision
            ? 100 - playerWithTheBall?.precision ?? 0 * -1
            : 0
        ));
    const y =
      event.clientY -
      rect.top +
      (Math.random() > 0.5
        ? Math.abs(
          playerWithTheBall?.precision
            ? 100 - playerWithTheBall?.precision ?? 0 * 1
            : 0
        )
        : Math.abs(
          playerWithTheBall?.precision
            ? 100 - playerWithTheBall?.precision ?? 0 * -1
            : 0
        ));
    console.log(x, y);
    const newBallCoordinates = new Coordinate(x, y);

    for (let i = 0; i < movable.length; i++) {
      if (movable[i] instanceof Ball) {
        const ball = <Ball>movable[i];

        let ballMoved = false;
        let goal = false;
        const moveAnimator = window.setInterval(
          () => {
            ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
            drawField();
            ballMoved = ball.moveTo(newBallCoordinates);
            movable.forEach((mov) => {
              if (mov instanceof Player) {
                mov.currentPosition = new Coordinate(
                  mov.defaultPosition.x,
                  mov.defaultPosition.y
                );
                mov.ballOwner = false;
                ballOwnedByPlayer = false;
                playerWithTheBall = undefined;
              } else if (mov instanceof Referee) {
                mov.moveTo(
                  new Coordinate(
                    newBallCoordinates.x - 50,
                    mov.role === RefereeRole.LINE_REF
                      ? mov.currentPosition.y
                      : newBallCoordinates.y - 75
                  )
                );
              }
              mov.draw();
            });
            if (ballMoved) {
              animationInProgress = true;
              window.clearInterval(moveAnimator);
              updateUI.bind(window);

              if (insideGoal(newBallCoordinates, leftGoal)) {
                teamOneScore += 1;
                goal = true;
              } else if (insideGoal(newBallCoordinates, rightGoal)) {
                teamTwoScore += 1;
                goal = true;
              }
              renderScores(teamOneScore, teamTwoScore);
              setTimeout(
                () => {
                  playerAnimator = window.setInterval(updateUI, 100);
                },
                goal ? 1500 : 1
              );
            }
          },
          goal ? 1500 : 1
        );
      } else {
        if (movable[i] instanceof Player) {
          const player = movable[i] as Player;
          if (player.ballOwner) {
            player.defaultPosition = player.currentPosition;
          }
        }
        movable[i].draw();
      }
    }
  }

  function renderScores(teamOneScore: number, teamTwoScore: number) {
    const teamOneScoreSpan = document.querySelector(
      ".team-one-score > b"
    ) as HTMLSpanElement;
    if (teamOneScoreSpan) {
      teamOneScoreSpan.textContent = String(teamOneScore);
    }
    const teamTwoScoreSpan = document.querySelector(
      ".team-two-score > b"
    ) as HTMLSpanElement;
    if (teamTwoScoreSpan) {
      teamTwoScoreSpan.textContent = String(teamTwoScore);
    }
  }

  function setupChangesBtns() {
    const cpaBtnElement = document.querySelector(
      "#addplayer"
    ) as HTMLButtonElement;

    const cpdBtnElement = document.querySelector(
      "#removeplayer"
    ) as HTMLButtonElement;

    const cTeamElement = document.querySelector(
      "#playerdelete-team"
    ) as HTMLSelectElement;

    const cJersyElement = document.querySelector(
      "#playerdelete-jersy"
    ) as HTMLSelectElement;

    const cAddPlayerElement = document.querySelector(
      "#playeradd"
    ) as HTMLSelectElement;

    cpdBtnElement.onclick = () => {

      let delTeam = cTeamElement.options[cTeamElement.selectedIndex].text;
      let delJersy = cJersyElement.options[cJersyElement.selectedIndex].text;

      let delChange = {} as footballSimulator.change;

      switch(delTeam) {
        case "Team 1": {
          delTeam = "Team One";
          break;
        }
        case "Team 2": {
          delTeam = "Team Two";
          break;
        }
      }

      delChange.jersy = Number(delJersy);
      delChange.team = delTeam;

      if (!footballSimulator.dels.some(e => e.jersy == delChange.jersy && e.team == delChange.team)) {
        footballSimulator.dels.push(delChange);     
      }

      let newTitle = delChange.team + " " + String(delChange.jersy);
      let newValue = delChange.team + "-" + String(delChange.jersy);
      cAddPlayerElement.options[cAddPlayerElement.options.length] = new Option(newTitle, newValue);
      console.log(movable);
  }
    cpaBtnElement.onclick = () => {
      let out = cAddPlayerElement.value
      if (out == "") {
        return
      } else {
        let title = out.split("-")[0]
        let value = out.split("-")[1]

        cAddPlayerElement.remove(cAddPlayerElement.selectedIndex); 

        let player = {} as footballSimulator.change;
        player.team = title;
        player.jersy = Number(value);

        footballSimulator.dels = footballSimulator.dels.filter((e) => { e.jersy != player.jersy && e.team != player.team });

        var positions, playerSpeed, playerPrecision, jerseyColor;

        if (player.team == "Team One") {
          positions = standardPositionsTeamOne;
          playerSpeed = [speedTeamOneMin, speedTeamOneMax];
          playerPrecision = [precisionTeamOneMin, precisionTeamOneMax];
          jerseyColor = jerseyColorTeamOne;
        } else {
          positions = standardPositionsTeamTwo;
          playerSpeed = [speedTeamTwoMin, speedTeamTwoMax];
          playerPrecision = [precisionTeamTwoMin, precisionTeamTwoMax];
          jerseyColor = jerseyColorTeamTwo;
        }

        const newPlayer = new Player(
          positions[player.jersy - 1],
          Object.assign({}, positions[player.jersy - 1]),
          player.team,
          player.jersy,
          false,
          jerseyColor,
          randomIntFromInterval(playerSpeed[0], playerSpeed[1]),
          randomIntFromInterval(playerPrecision[0], playerPrecision[1])
        );

        players.push(newPlayer);
        movable.push(newPlayer);

        adds = adds + 1;

        if (adds == 4) { // only 4 changes on the game
          cpdBtnElement.disabled=true;
          cpaBtnElement.disabled=true;
          cTeamElement.disabled=true;
          cJersyElement.disabled=true;
          cAddPlayerElement.disabled=true;
          return
        }

      }
      //get value and transform to player
    }
}

  function setupPlayerStats() {
    const psBtnElement = document.querySelector(
      "#ps-btn"
    ) as HTMLButtonElement;

    const psTeamElement = document.querySelector(
      "#ps-team"
    ) as HTMLSelectElement;

    const psPlayerElement = document.querySelector(
      "#ps-player"
    ) as HTMLSelectElement;

    psBtnElement.onclick = () => {

      var team: String = "";
      var jersy: String = psPlayerElement.options[psPlayerElement.selectedIndex].text;

      switch(psTeamElement.options[psTeamElement.selectedIndex].text) {
        case "Team 1": {
          team = "Team One";
          break;
        }
        case "Team 2": {
          team = "Team Two";
          break;
        }
      }
      
      var infoPlayer = footballSimulator.players.find((e) => e.team == team && e.jersy == Number(jersy));
      
      if (infoPlayer != undefined) {
        const psNumberParagraph = document.querySelector(
          "#ps-number-show"
        ) as HTMLParagraphElement;
        const psTeamParagraph = document.querySelector(
          "#ps-team-show"
        ) as HTMLParagraphElement;
        const psPrecisionParagraph = document.querySelector(
          "#ps-precision-show"
        ) as HTMLParagraphElement;
        const psSpeedParagraph = document.querySelector(
          "#ps-speed-show"
        ) as HTMLParagraphElement;

        psNumberParagraph.textContent = String(infoPlayer.jersy);
        psTeamParagraph.textContent = String(infoPlayer.team);
        psPrecisionParagraph.textContent = String(infoPlayer.precision);
        psSpeedParagraph.textContent = String(infoPlayer.speed);
      }      

    }

  }

  function renderPlayerInformation(player: Player): void {
    if (player) {
      const playerJerseyNumberParagraph = document.querySelector(
        ".player__jersy"
      ) as HTMLParagraphElement;

      const playerSpeedParagraph = document.querySelector(
        ".player__speed"
      ) as HTMLParagraphElement;
      const playerPrecisionParagraph = document.querySelector(
        ".player__precision"
      ) as HTMLParagraphElement;
      const playerTeamParagraph = document.querySelector(
        ".player__team"
      ) as HTMLParagraphElement;

      playerJerseyNumberParagraph.textContent = String(player.jersy);
      playerSpeedParagraph.textContent = String(player.speed);
      playerPrecisionParagraph.textContent = String(player.precision);
      playerTeamParagraph.textContent = String(player.team);
    }
  }

  function changes(element: any) {

    let out = !footballSimulator.dels.some(e => e.jersy == element.jersy && e.team == element.team );
    return out
  }

  function updateUI(): void {
    if (animationInProgress) {
      const ground = getGround();
      const canvasGround = getCanvas();

      ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
      drawField();
      // setupReferees();
      var players: Player[] = [];

      let ball: Ball | undefined;

      movable = movable.filter(changes);

      movable.forEach((mov) => {
        if (mov instanceof Player) {
          players.push(mov);
        } else if (mov instanceof Ball) {
          ball = mov;
          ball.draw();
        }
      });

      players = players.filter(changes);

      console.log(movable);

      footballSimulator.players = players;

      if (ball && players.length > 0) {
        if (!ballOwnedByPlayer) {
          for (let i = 0; i < movable.length; i++) {
            const mov = movable[i];
            if (mov instanceof Ball) {
              mov.draw();
            }
          }
          for (let i = 0; i < players.length; i++) {
            const player = players[i];
            player.moveTo(ball.currentPosition);
            const distanceBetweenPlayerAndBall =
              player.currentPosition.getDistanceTo(ball.currentPosition);
            if (distanceBetweenPlayerAndBall < 300) {
              if (!ballOwnedByPlayer && distanceBetweenPlayerAndBall <= 25) {
                player.ballOwner = true;
                ballOwnedByPlayer = true;
                playerWithTheBall = player;
                renderPlayerInformation(playerWithTheBall);
              } else {
                player.ballOwner = false;
              }
              player.triedToGetBall = true;
            } else {
              player.ballOwner = false;
            }
            player.draw();
          }
        } else {
          ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
          drawField();
          // setupReferees();
          for (let i = 0; i < movable.length; i++) {
            const mov = movable[i];
            if (mov instanceof Player) {
              if (mov.ballOwner) {
                mov.draw();
                continue;
              }
              mov.currentPosition = Object.assign({}, mov.defaultPosition);
              mov.draw();
            } else {
              mov.draw();
            }
          }
          animationInProgress = false;
        }
      } else {
        window.clearInterval();
      }
    } else {
      window.clearInterval(playerAnimator);
    }
  }
}