namespace Abschlussarbeit {
    export class Ball {
        position: Vector;
        speed: number = 0.1;
        newPos: Vector;
        balance: Vector;

        constructor(_pos: Vector) {
            this.position = _pos.copy();
            console.log("create ball");
            this.newPos = _pos.copy();
        }

        draw(): void {
            crc2.translate(this.position.x, this.position.y);
            crc2.moveTo(7, 0);
            crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            crc2.lineWidth = 1;
            crc2.fillStyle = "violet";
            crc2.strokeStyle = "black";
            crc2.fill();
            crc2.stroke();
            crc2.resetTransform();
            console.log("testball");
        }

        shot(_pos: Vector): void {
            if (stop == true) {
            this.newPos = _pos.copy();
            }
           
        }

        move(): void {
            let directionX: number = this.newPos.x - this.position.x;
            let directionY: number = this.newPos.y - this.position.y;
            let direction: Vector = new Vector(directionX, directionY);
            direction.scale(this.speed);
            this.position.add(direction);
        }

    }
}