"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Ball {
        constructor(_pos) {
            this.speed = 0.1;
            this.position = _pos.copy();
            console.log("create ball");
            this.newPos = _pos.copy();
        }
        draw() {
            Abschlussarbeit.crc2.translate(this.position.x, this.position.y);
            Abschlussarbeit.crc2.moveTo(7, 0);
            Abschlussarbeit.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            Abschlussarbeit.crc2.lineWidth = 1;
            Abschlussarbeit.crc2.fillStyle = "violet";
            Abschlussarbeit.crc2.strokeStyle = "black";
            Abschlussarbeit.crc2.fill();
            Abschlussarbeit.crc2.stroke();
            Abschlussarbeit.crc2.resetTransform();
            console.log("testball");
        }
        shot(_pos) {
            if (Abschlussarbeit.stop == true) {
                this.newPos = _pos.copy();
            }
        }
        move() {
            let directionX = this.newPos.x - this.position.x;
            let directionY = this.newPos.y - this.position.y;
            let direction = new Abschlussarbeit.Vector(directionX, directionY);
            direction.scale(this.speed);
            this.position.add(direction);
        }
    }
    Abschlussarbeit.Ball = Ball;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=ball.js.map