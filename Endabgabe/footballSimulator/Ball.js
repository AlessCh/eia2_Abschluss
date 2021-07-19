"use strict";
var footballSimulator;
(function (footballSimulator) {
    class Ball {
        constructor(position, player) {
            this.currentPosition = position;
            this.ownedBy = player;
        }
        move() {
            throw new Error("Method not implemented.");
        }
        moveTo(position) {
            const difference = this.currentPosition.getDistanceTo(position); //variable constant difference, current position -> get distance to (target position)
            if (difference > 10) { //to target position
                const deltaX = position.x - this.currentPosition.x; //variable constant, cannot be changed
                const deltaY = position.y - this.currentPosition.y;
                const angle = Math.atan2(deltaY, deltaX); //atan returns angle in radians from the X axis to a point
                this.currentPosition.x += 2 * Math.cos(angle); //returns cosin of number
                this.currentPosition.y += 2 * Math.sin(angle); //returns sine of number
                return false;
            }
            return true;
        }
        draw() {
            //const canvasGround = getCanvas();
            const ground = footballSimulator.getGround();
            ground.save();
            ground.beginPath();
            ground.fillStyle = "white";
            ground.arc(//(x, y, radius, startAngle, endAngle
            this.currentPosition.x, this.currentPosition.y, 10, 0, 2 * Math.PI);
            ground.closePath();
            ground.fill();
            ground.restore();
        }
    }
    footballSimulator.Ball = Ball;
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Ball.js.map