"use strict";
var footballSimulator;
(function (footballSimulator) {
    class Ball {
        currentPosition;
        ownedBy;
        constructor(position, player) {
            this.currentPosition = position;
            this.ownedBy = player;
        }
        move() {
            throw new Error("Method not implemented.");
        }
        moveTo(position) {
            const difference = this.currentPosition.getDistanceTo(position);
            if (difference > 10) {
                const deltaX = position.x - this.currentPosition.x;
                const deltaY = position.y - this.currentPosition.y;
                const angle = Math.atan2(deltaY, deltaX);
                this.currentPosition.x += 2 * Math.cos(angle);
                this.currentPosition.y += 2 * Math.sin(angle);
                return false;
            }
            return true;
        }
        draw() {
            //const canvasGround = getCanvas();
            const ground = footballSimulator.getGround();
            ground.save();
            ground.beginPath();
            ground.arc(this.currentPosition.x, this.currentPosition.y, 15, 0, 2 * Math.PI);
            ground.fillStyle = "white";
            ground.fill();
            ground.closePath();
            ground.restore();
            ground.save();
            ground.beginPath();
            ground.moveTo(this.currentPosition.x - 5, this.currentPosition.y - 7);
            ground.lineTo(this.currentPosition.x + 5, this.currentPosition.y - 7);
            ground.lineTo(this.currentPosition.x + 7, this.currentPosition.y);
            ground.lineTo(this.currentPosition.x, this.currentPosition.y + 6);
            ground.lineTo(this.currentPosition.x - 7, this.currentPosition.y);
            ground.closePath();
            ground.fillStyle = "black";
            ground.fill();
            ground.restore();
            ground.save();
            ground.beginPath();
            ground.moveTo(this.currentPosition.x - 3, this.currentPosition.y - 5);
            ground.lineTo(this.currentPosition.x - 7, this.currentPosition.y - 10);
            ground.moveTo(this.currentPosition.x + 3, this.currentPosition.y - 5);
            ground.lineTo(this.currentPosition.x + 7, this.currentPosition.y - 10);
            ground.moveTo(this.currentPosition.x + 5, this.currentPosition.y);
            ground.lineTo(this.currentPosition.x + 13, this.currentPosition.y + 2);
            ground.moveTo(this.currentPosition.x, this.currentPosition.y + 4);
            ground.lineTo(this.currentPosition.x, this.currentPosition.y + 12);
            ground.moveTo(this.currentPosition.x - 5, this.currentPosition.y);
            ground.lineTo(this.currentPosition.x - 13, this.currentPosition.y + 2);
            ground.stroke();
            ground.restore();
        }
    }
    footballSimulator.Ball = Ball;
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Ball.js.map