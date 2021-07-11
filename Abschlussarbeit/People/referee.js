"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Reff extends Abschlussarbeit.Person {
        constructor(_pos) {
            super(_pos);
            this.position = _pos;
        }
        draw() {
            Abschlussarbeit.crc2.translate(this.position.x, this.position.y);
            let reff = new Path2D();
            reff.moveTo(20, 25);
            reff.lineTo(20, 55);
            reff.lineTo(60, 55);
            reff.lineTo(60, 25);
            reff.lineTo(75, 25);
            reff.lineTo(75, 15);
            reff.lineTo(60, 5);
            reff.moveTo(20, 25);
            reff.lineTo(5, 25);
            reff.lineTo(5, 15);
            reff.lineTo(20, 5);
            reff.lineTo(60, 5);
            Abschlussarbeit.crc2.lineWidth = 4;
            Abschlussarbeit.crc2.strokeStyle = "white";
            Abschlussarbeit.crc2.fillStyle = "black";
            Abschlussarbeit.crc2.save();
            Abschlussarbeit.crc2.scale(0.5, 0.5);
            Abschlussarbeit.crc2.stroke(reff);
            Abschlussarbeit.crc2.fill(reff);
            Abschlussarbeit.crc2.restore();
            Abschlussarbeit.crc2.fillStyle = "white";
            Abschlussarbeit.crc2.font = "10px Arial";
            Abschlussarbeit.crc2.fillText(" S", 14, 21);
            Abschlussarbeit.crc2.resetTransform();
        }
    }
    Abschlussarbeit.Reff = Reff;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=referee.js.map