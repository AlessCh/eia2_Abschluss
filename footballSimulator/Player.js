"use strict";
var footballSimulator;
(function (footballSimulator) {
    class Player {
        currentPosition;
        defaultPosition;
        team;
        jersy;
        ballOwner;
        jersyColor;
        speed;
        precision;
        triedToGetBall;
        constructor(currentplayerPosition, defaultplayerPosition, team, jersy, ballOwner, jerseyColor, speed, precision) {
            this.currentPosition = currentplayerPosition;
            this.defaultPosition = defaultplayerPosition;
            this.team = team;
            this.jersy = jersy;
            this.ballOwner = ballOwner;
            this.jersyColor = jerseyColor;
            this.speed = speed;
            this.precision = precision;
            this.triedToGetBall = false;
        }
        move() {
            throw new Error("Method not implemented.");
        }
        draw() {
            //const canvasGround = getCanvas();
            const ground = footballSimulator.getGround();
            ground.save();
            ground.beginPath();
            ground.arc(this.currentPosition.x, this.currentPosition.y, 20, 0, Math.PI * 2);
            ground.closePath();
            ground.fillStyle = this.jersyColor;
            ground.fill();
            ground.restore();
            // Jersey Number
            ground.save();
            ground.fillStyle = "black";
            ground.font = "20px serif";
            ground.fillText(String(this.jersy), this.currentPosition.x, this.currentPosition.y, 20);
            ground.restore();
            // Player range
            // ground.save();
            // ground.beginPath();
            // ground.arc(
            //   this.defaultPosition.x,
            //   this.defaultPosition.y,
            //   300,
            //   0,
            //   2 * Math.PI
            // );
            // ground.strokeStyle = this.jersyColor;
            // ground.stroke();
            // ground.restore();
        }
        moveTo(position) {
            const difference = this.currentPosition.getDistanceTo(position);
            if (difference < 300 && difference > 10) {
                const deltaX = position.x - this.currentPosition.x;
                const deltaY = position.y - this.currentPosition.y;
                const angle = Math.atan2(deltaY, deltaX);
                this.currentPosition.x += 1 * this.speed * Math.cos(angle);
                this.currentPosition.y += 1 * this.speed * Math.sin(angle);
            }
        }
    }
    footballSimulator.Player = Player;
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Player.js.map