"use strict";
var footballSimulator;
(function (footballSimulator) {
    //window.addEventListener("load", handleLoad);
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
    var movable = [];
    let ballOwnedByPlayer = false;
    let playerWithTheBall;
    let teamOneScore = 0;
    let teamTwoScore = 0;
    footballSimulator.players = [];
    footballSimulator.adds = 0;
    footballSimulator.dels = [];
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
    var jerseyColorTeamOne;
    var jerseyColorTeamTwo;
    var speedTeamOneMin;
    var speedTeamOneMax;
    var speedTeamTwoMin;
    var speedTeamTwoMax;
    var precisionTeamOneMin;
    var precisionTeamOneMax;
    var precisionTeamTwoMin;
    var precisionTeamTwoMax;
    //function handleLoad(): void {
    //}
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
        var players = [];
        for (let i = 1; i <= 11; i++) {
            const player = new footballSimulator.Player(positions[i - 1], Object.assign({}, positions[i - 1]), teamName, i, false, jerseyColor, randomIntFromInterval(playerSpeed[0], playerSpeed[1]), randomIntFromInterval(playerPrecision[0], playerPrecision[1]));
            players.push(player);
        }
        players = players.filter(changes);
        players.forEach((player) => {
            console.log(player);
            player.draw();
            movable.push(player);
        });
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
        setupTeams(jerseyColorTeamOne, jerseyColorTeamTwo, [speedTeamOneMin, speedTeamOneMax], [speedTeamTwoMin, speedTeamTwoMax], [precisionTeamOneMin, precisionTeamOneMax], [precisionTeamTwoMin, precisionTeamTwoMax]);
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
    function setupChangesBtns() {
        const cpaBtnElement = document.querySelector("#addplayer");
        const cpdBtnElement = document.querySelector("#removeplayer");
        const cTeamElement = document.querySelector("#playerdelete-team");
        const cJersyElement = document.querySelector("#playerdelete-jersy");
        const cAddPlayerElement = document.querySelector("#playeradd");
        cpdBtnElement.onclick = () => {
            let delTeam = cTeamElement.options[cTeamElement.selectedIndex].text;
            let delJersy = cJersyElement.options[cJersyElement.selectedIndex].text;
            let delChange = {};
            switch (delTeam) {
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
        };
        cpaBtnElement.onclick = () => {
            let out = cAddPlayerElement.value;
            if (out == "") {
                return;
            }
            else {
                let title = out.split("-")[0];
                let value = out.split("-")[1];
                cAddPlayerElement.remove(cAddPlayerElement.selectedIndex);
                let player = {};
                player.team = title;
                player.jersy = Number(value);
                footballSimulator.dels = footballSimulator.dels.filter((e) => { e.jersy != player.jersy && e.team != player.team; });
                var positions, playerSpeed, playerPrecision, jerseyColor;
                if (player.team == "Team One") {
                    positions = standardPositionsTeamOne;
                    playerSpeed = [speedTeamOneMin, speedTeamOneMax];
                    playerPrecision = [precisionTeamOneMin, precisionTeamOneMax];
                    jerseyColor = jerseyColorTeamOne;
                }
                else {
                    positions = standardPositionsTeamTwo;
                    playerSpeed = [speedTeamTwoMin, speedTeamTwoMax];
                    playerPrecision = [precisionTeamTwoMin, precisionTeamTwoMax];
                    jerseyColor = jerseyColorTeamTwo;
                }
                const newPlayer = new footballSimulator.Player(positions[player.jersy - 1], Object.assign({}, positions[player.jersy - 1]), player.team, player.jersy, false, jerseyColor, randomIntFromInterval(playerSpeed[0], playerSpeed[1]), randomIntFromInterval(playerPrecision[0], playerPrecision[1]));
                footballSimulator.players.push(newPlayer);
                movable.push(newPlayer);
                footballSimulator.adds = footballSimulator.adds + 1;
                if (footballSimulator.adds == 4) { // only 4 changes on the game
                    cpdBtnElement.disabled = true;
                    cpaBtnElement.disabled = true;
                    cTeamElement.disabled = true;
                    cJersyElement.disabled = true;
                    cAddPlayerElement.disabled = true;
                    return;
                }
            }
            //get value and transform to player
        };
    }
    function setupPlayerStats() {
        const psBtnElement = document.querySelector("#ps-btn");
        const psTeamElement = document.querySelector("#ps-team");
        const psPlayerElement = document.querySelector("#ps-player");
        psBtnElement.onclick = () => {
            var team = "";
            var jersy = psPlayerElement.options[psPlayerElement.selectedIndex].text;
            switch (psTeamElement.options[psTeamElement.selectedIndex].text) {
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
                const psNumberParagraph = document.querySelector("#ps-number-show");
                const psTeamParagraph = document.querySelector("#ps-team-show");
                const psPrecisionParagraph = document.querySelector("#ps-precision-show");
                const psSpeedParagraph = document.querySelector("#ps-speed-show");
                psNumberParagraph.textContent = String(infoPlayer.jersy);
                psTeamParagraph.textContent = String(infoPlayer.team);
                psPrecisionParagraph.textContent = String(infoPlayer.precision);
                psSpeedParagraph.textContent = String(infoPlayer.speed);
            }
        };
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
    function changes(element) {
        let out = !footballSimulator.dels.some(e => e.jersy == element.jersy && e.team == element.team);
        return out;
    }
    function updateUI() {
        if (animationInProgress) {
            const ground = footballSimulator.getGround();
            const canvasGround = footballSimulator.getCanvas();
            ground.clearRect(0, 0, canvasGround.width, canvasGround.height);
            footballSimulator.drawField();
            // setupReferees();
            var players = [];
            let ball;
            movable = movable.filter(changes);
            movable.forEach((mov) => {
                if (mov instanceof footballSimulator.Player) {
                    players.push(mov);
                }
                else if (mov instanceof footballSimulator.Ball) {
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