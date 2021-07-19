namespace footballSimulator {
    export class Ball implements Movable {
        public currentPosition: Coordinate;
        public ownedBy: Player | undefined;

        constructor(position: Coordinate, player?: Player) {
            this.currentPosition = position;
            this.ownedBy = player;
        }

        move(): void {
            throw new Error("Method not implemented.");
        }

        moveTo(position: Coordinate): boolean {
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

        draw(): void {
            //const canvasGround = getCanvas();
            const ground = getGround();
            ground.save();
            ground.beginPath();
            ground.fillStyle = "white";
            ground.arc( //(x, y, radius, startAngle, endAngle
                this.currentPosition.x,
                this.currentPosition.y,
                10,
                0,
                2 * Math.PI
            );
            ground.closePath();
            ground.fill();
            ground.restore();
        }
    }
}