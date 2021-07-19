namespace footballSimulator {
    export class Coordinate {
        public x: number;
        public y: number;

        constructor(xCoord: number = 0, yCoord: number = 0) {
            this.x = xCoord;
            this.y = yCoord;
        }

        getDistanceTo(coordinate: Coordinate): number { //parameter coordinate
            return Math.hypot( //Math.hypot returns square root of the sum of squares of its arguments
                Math.abs(this.x - coordinate.x), //math.abs returns absolute value of a number 
                Math.abs(this.y - coordinate.y)
            );
        }

        getDistance(coordinate: Coordinate): Coordinate {
            return new Coordinate(
                Math.abs(this.x - coordinate.x),
                Math.abs(this.y - coordinate.y)
            );
        }
    }
}