namespace footballSimulator {
  export class Coordinate {
    x: number;
    y: number;

    constructor(xCoord: number = 0, yCoord: number = 0) {
      this.x = xCoord;
      this.y = yCoord;
    }

    getDistanceTo(coordinate: Coordinate): number {
      return Math.hypot(
        Math.abs(this.x - coordinate.x),
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