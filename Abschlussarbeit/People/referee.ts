namespace Abschlussarbeit {
    export class Reff extends Person {
        position: Vector;

        constructor(_pos: Vector) {
            super(_pos);
            this.position = _pos;
        }

        draw(): void {
            crc2.translate(this.position.x, this.position.y);
            let reff: Path2D = new Path2D();
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
            crc2.lineWidth = 4;
            crc2.strokeStyle = "white";
            crc2.fillStyle = "black";
            crc2.save();
            crc2.scale(0.5, 0.5);
            crc2.stroke(reff);
            crc2.fill(reff);
            crc2.restore();
            crc2.fillStyle = "white";
            crc2.font = "10px Arial";
            crc2.fillText(" S", 14, 21);
            crc2.resetTransform();
        }
    }
}