"use strict";
var footballSimulator;
(function (footballSimulator) {
    const canvasGround = document.getElementById("playground");
    const playerInfo = document.getElementById("playerinfo");
    const gameDetails = document.getElementById("gamedetails");
    //const playerStats = document.getElementById("playerstats") as HTMLFormElement;
    const teamOne = document.getElementById("teamone");
    const teamTwo = document.getElementById("teamtwo");
    const ground = canvasGround.getContext("2d");
    let gameStarted = false;
    const startGameButton = document.getElementById("starter");
    const resetGameButton = document.getElementById("reset");
    const groundWidth = canvasGround.width;
    const groundHeight = canvasGround.height;
    const movable = [];
    let ballOwnedByPlayer = false;
    let playerWithTheBall;
    let teamOneScore = 0;
    let teamTwoScore = 0;
    const leftGoal = [
        new footballSimulator.Coordinate(50, 330),
        new footballSimulator.Coordinate(50, 410),
        new footballSimulator.Coordinate(10, 330),
        new footballSimulator.Coordinate(10, 410),
    ];
    const rightGoal = [
        new footballSimulator.Coordinate(1110, 330),
        new footballSimulator.Coordinate(1110, 410),
        new footballSimulator.Coordinate(1150, 330),
        new footballSimulator.Coordinate(1150, 410),
    ];
    const standardPositionsTeamOne = [
        new footballSimulator.Coordinate((groundWidth / 110) * 10, groundHeight / 2 + 30),
        new footballSimulator.Coordinate((groundWidth / 110) * 15, (groundHeight / 75) * 17),
        new footballSimulator.Coordinate((groundWidth / 110) * 15, (groundHeight / 75) * 65),
        new footballSimulator.Coordinate((groundWidth / 110) * 32, groundHeight / 2 + 30),
        new footballSimulator.Coordinate((groundWidth / 110) * 43, groundHeight / 2 - 110),
        new footballSimulator.Coordinate((groundWidth / 110) * 43, groundHeight / 2 + 180),
        new footballSimulator.Coordinate((groundWidth / 110) * 57, groundHeight / 2 + 125),
        new footballSimulator.Coordinate((groundWidth / 110) * 75, (groundHeight / 75) * 15),
        new footballSimulator.Coordinate((groundWidth / 110) * 75, (groundHeight / 75) * 68),
        new footballSimulator.Coordinate((groundWidth / 110) * 88.5, groundHeight / 2 - 50),
        new footballSimulator.Coordinate((groundWidth / 110) * 88.5, groundHeight / 2 + 110),
    ];
    const standardPositionsTeamTwo = [
        new footballSimulator.Coordinate((groundWidth / 110) * 100, groundHeight / 2 + 30),
        new footballSimulator.Coordinate((groundWidth / 110) * 78, groundHeight / 2 + 30),
        new footballSimulator.Coordinate((groundWidth / 110) * 67, groundHeight / 2 - 110),
        new footballSimulator.Coordinate((groundWidth / 110) * 67, groundHeight / 2 + 180),
        new footballSimulator.Coordinate((groundWidth / 110) * 54, groundHeight / 2 - 60),
        new footballSimulator.Coordinate((groundWidth / 110) * 35, (groundHeight / 75) * 68),
        new footballSimulator.Coordinate((groundWidth / 110) * 21.5, groundHeight / 2 + 110),
        new footballSimulator.Coordinate((groundWidth / 110) * 21.5, groundHeight / 2 - 50),
        new footballSimulator.Coordinate((groundWidth / 110) * 35, (groundHeight / 75) * 15),
        new footballSimulator.Coordinate((groundWidth / 110) * 95, (groundHeight / 75) * 65),
        new footballSimulator.Coordinate((groundWidth / 110) * 95, (groundHeight / 75) * 17),
    ];
    let animationInProgress = true;
    footballSimulator.drawField();
    setupReferees();
    setupBall();
    let playerAnimator = window.setInterval(updateUI, 100);
    function setupTeams(teamOneColor = "#00ffaa", teamTwoColor = "#d703fc", teamOneplayerPrecision = [10, 10], teamOneplayerSpeed = [10, 10], teamTwoplayerPrecision = [10, 10], teamTwoplayerSpeed = [10, 10]) {
        setupTeam("Team One", standardPositionsTeamOne, teamOneColor, teamOneplayerPrecision, teamOneplayerSpeed);
        setupTeam("Team Two", standardPositionsTeamTwo, teamTwoColor, teamTwoplayerPrecision, teamTwoplayerSpeed);
    }
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function setupTeam(teamName, positions, jerseyColor, playerPrecision, playerSpeed) {
        for (let i = 1; i <= 11; i++) {
            const player = new footballSimulator.Player(positions[i - 1], Object.assign({}, positions[i - 1]), teamName, i, false, jerseyColor, randomIntFromInterval(playerSpeed[0], playerSpeed[1]), randomIntFromInterval(playerPrecision[0], playerPrecision[1]));
            console.log(player);
            player.draw();
            movable.push(player);
        }
    }
    function setupReferees() {
        for (let i = 0; i < 2; i++) {
            const lineReferee = new footballSimulator.Referee(i === 0
                ? new footballSimulator.Coordinate(groundWidth / 2, (groundHeight / 75) * 76.5)
                : new footballSimulator.Coordinate(groundWidth / 2, (groundHeight / 75) * 6.5), footballSimulator.RefereeRole.LINE_REF);
            lineReferee.draw();
            movable.push(lineReferee);
        }
        const groundReferee = new footballSimulator.Referee(new footballSimulator.Coordinate((groundWidth / 110) * 60, groundHeight / 2 + 30), footballSimulator.RefereeRole.GROUND_REF);
        groundReferee.draw();
        movable.push(groundReferee);
    }
    function setupBall() {
        const ball = new footballSimulator.Ball(new footballSimulator.Coordinate(groundWidth / 2, groundHeight / 2), undefined);
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
        }
        else if ("Enter" === key && !gameStarted) {
            startGame();
        }
    });
    function startGame() {
        const jerseyColorTeamOneInput = document.getElementById("color-team-one");
        const jerseyColorTeamTwoInput = document.getElementById("color-team-two");
        const precisionTeamOneInputMin = document.getElementById("team-one-precision-min");
        const precisionTeamOneInputMax = document.getElementById("team-one-precision-max");
        const precisionTeamTwoInputMin = document.getElementById("team-two-precision-min");
        const precisionTeamTwoInputMax = document.getElementById("team-two-precision-max");
        const speedTeamOneInputMin = document.getElementById("team-one-speed-min");
        const speedTeamOneInputMax = document.getElementById("team-one-speed-max");
        const speedTeamTwoInputMin = document.getElementById("team-two-speed-min");
        const speedTeamTwoInputMax = document.getElementById("team-two-speed-max");
        const jerseyColorTeamOne = jerseyColorTeamOneInput.value;
        const jerseyColorTeamTwo = jerseyColorTeamTwoInput.value;
        const speedTeamOneMin = Number(speedTeamOneInputMin.value);
        const speedTeamOneMax = Number(speedTeamOneInputMax.value);
        const speedTeamTwoMin = Number(speedTeamTwoInputMin.value);
        const speedTeamTwoMax = Number(speedTeamTwoInputMax.value);
        const precisionTeamOneMin = Number(precisionTeamOneInputMin.value);
        const precisionTeamOneMax = Number(precisionTeamOneInputMax.value);
        const precisionTeamTwoMin = Number(precisionTeamTwoInputMin.value);
        const precisionTeamTwoMax = Number(precisionTeamTwoInputMax.value);
        setupTeams(jerseyColorTeamOne, jerseyColorTeamTwo, [speedTeamOneMin, speedTeamOneMax], [speedTeamTwoMin, speedTeamTwoMax], [precisionTeamOneMin, precisionTeamOneMax], [precisionTeamTwoMin, precisionTeamTwoMax]);
        playerInfo.classList.toggle("hidden");
        gameDetails.classList.toggle("hidden");
        //playerStats.classList.toggle("hidden");
        teamOne.classList.toggle("hidden");
        teamTwo.classList.toggle("hidden");
        canvasGround.classList.toggle("hidden");
        startGameButton.classList.toggle("hidden");
        resetGameButton.classList.toggle("hidden");
        gameStarted = true;
    }
    function resetGame() {
        window.location.reload();
    }
    function insideGoal(coordinate, borders) {
        const xBoarders = new Set();
        const yBoarders = new Set();
        borders.forEach((coord) => {
            xBoarders.add(coord.x);
            yBoarders.add(coord.y);
        });
        const xValueArr = Array.from(xBoarders);
        xValueArr.sort((a, b) => a - b);
        const yValueArr = Array.from(yBoarders);
        yValueArr.sort((a, b) => a - b);
        if (coordinate.x >= xValueArr[0] &&
            coordinate.x <= xValueArr[1] &&
            coordinate.y >= yValueArr[0] &&
            coordinate.y <= yValueArr[1]) {
            return true;
        }
        return false;
    }
    function kickBall(event) {
        const rect = canvasGround.getBoundingClientRect();
        const x = event.clientX -
            rect.left +
            (Math.random() > 0.5
                ? Math.abs(playerWithTheBall?.precision
                    ? 100 - playerWithTheBall?.precision ?? 0 * 1
                    : 0)
                : Math.abs(playerWithTheBall?.precision
                    ? 100 - playerWithTheBall?.precision ?? 0 * -1
                    : 0));
        const y = event.clientY -
            rect.top +
            (Math.random() > 0.5
                ? Math.abs(playerWithTheBall?.precision
                    ? 100 - playerWithTheBall?.precision ?? 0 * 1
                    : 0)
                : Math.abs(playerWithTheBall?.precision
                    ? 100 - playerWithTheBall?.precision ?? 0 * -1
                    : 0));
        console.log(x, y);
        const newBallCoordinates = new footballSimulator.Coordinate(x, y);
        for (let i = 0; i < movable.length; i++) {
            if (movable[i] instanceof footballSimulator.Ball) {
                const ball = movable[i];
                let ballMoved = false;
                let goal = false;
                const moveAnimator = window.setInterval(() => {
                    ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
                    footballSimulator.drawField();
                    ballMoved = ball.moveTo(newBallCoordinates);
                    movable.forEach((mov) => {
                        if (mov instanceof footballSimulator.Player) {
                            mov.currentPosition = new footballSimulator.Coordinate(mov.defaultPosition.x, mov.defaultPosition.y);
                            mov.ballOwner = false;
                            ballOwnedByPlayer = false;
                            playerWithTheBall = undefined;
                        }
                        else if (mov instanceof footballSimulator.Referee) {
                            mov.moveTo(new footballSimulator.Coordinate(newBallCoordinates.x - 50, mov.role === footballSimulator.RefereeRole.LINE_REF
                                ? mov.currentPosition.y
                                : newBallCoordinates.y - 75));
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
                        }
                        else if (insideGoal(newBallCoordinates, rightGoal)) {
                            teamTwoScore += 1;
                            goal = true;
                        }
                        renderScores(teamOneScore, teamTwoScore);
                        setTimeout(() => {
                            playerAnimator = window.setInterval(updateUI, 100);
                        }, goal ? 1500 : 1);
                    }
                }, goal ? 1500 : 1);
            }
            else {
                if (movable[i] instanceof footballSimulator.Player) {
                    const player = movable[i];
                    if (player.ballOwner) {
                        player.defaultPosition = player.currentPosition;
                    }
                }
                movable[i].draw();
            }
        }
    }
    function renderScores(teamOneScore, teamTwoScore) {
        const teamOneScoreSpan = document.querySelector(".team-one-score > b");
        if (teamOneScoreSpan) {
            teamOneScoreSpan.textContent = String(teamOneScore);
        }
        const teamTwoScoreSpan = document.querySelector(".team-two-score > b");
        if (teamTwoScoreSpan) {
            teamTwoScoreSpan.textContent = String(teamTwoScore);
        }
    }
    function renderPlayerInformation(player) {
        if (player) {
            const playerJerseyNumberParagraph = document.querySelector(".player__jersy");
            const playerSpeedParagraph = document.querySelector(".player__speed");
            const playerPrecisionParagraph = document.querySelector(".player__precision");
            const playerTeamParagraph = document.querySelector(".player__team");
            playerJerseyNumberParagraph.textContent = String(player.jersy);
            playerSpeedParagraph.textContent = String(player.speed);
            playerPrecisionParagraph.textContent = String(player.precision);
            playerTeamParagraph.textContent = String(player.team);
        }
    }
    function updateUI() {
        if (animationInProgress) {
            const ground = footballSimulator.getGround();
            const canvasGround = footballSimulator.getCanvas();
            ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
            footballSimulator.drawField();
            // setupReferees();
            const players = [];
            let ball;
            movable.forEach((mov) => {
                if (mov instanceof footballSimulator.Player) {
                    players.push(mov);
                }
                else if (mov instanceof footballSimulator.Ball) {
                    ball = mov;
                    ball.draw();
                }
            });
            if (ball && players.length > 0) {
                if (!ballOwnedByPlayer) {
                    for (let i = 0; i < movable.length; i++) {
                        const mov = movable[i];
                        if (mov instanceof footballSimulator.Ball) {
                            mov.draw();
                        }
                    }
                    for (let i = 0; i < players.length; i++) {
                        const player = players[i];
                        player.moveTo(ball.currentPosition);
                        const distanceBetweenPlayerAndBall = player.currentPosition.getDistanceTo(ball.currentPosition);
                        if (distanceBetweenPlayerAndBall < 300) {
                            if (!ballOwnedByPlayer && distanceBetweenPlayerAndBall <= 25) {
                                player.ballOwner = true;
                                ballOwnedByPlayer = true;
                                playerWithTheBall = player;
                                renderPlayerInformation(playerWithTheBall);
                            }
                            else {
                                player.ballOwner = false;
                            }
                            player.triedToGetBall = true;
                        }
                        else {
                            player.ballOwner = false;
                        }
                        player.draw();
                    }
                }
                else {
                    ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
                    footballSimulator.drawField();
                    // setupReferees();
                    for (let i = 0; i < movable.length; i++) {
                        const mov = movable[i];
                        if (mov instanceof footballSimulator.Player) {
                            if (mov.ballOwner) {
                                mov.draw();
                                continue;
                            }
                            mov.currentPosition = Object.assign({}, mov.defaultPosition);
                            mov.draw();
                        }
                        else {
                            mov.draw();
                        }
                    }
                    animationInProgress = false;
                }
            }
            else {
                window.clearInterval();
            }
        }
        else {
            window.clearInterval(playerAnimator);
        }
    }
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Main.js.map