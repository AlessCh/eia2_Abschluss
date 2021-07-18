"use strict";
var footballSimulator;
(function (footballSimulator) {
    class Coordinate {
        x;
        y;
        constructor(xCoord = 0, yCoord = 0) {
            this.x = xCoord;
            this.y = yCoord;
        }
        getDistanceTo(coordinate) {
            return Math.hypot(Math.abs(this.x - coordinate.x), Math.abs(this.y - coordinate.y));
        }
        getDistance(coordinate) {
            return new Coordinate(Math.abs(this.x - coordinate.x), Math.abs(this.y - coordinate.y));
        }
    }
    footballSimulator.Coordinate = Coordinate;
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Coordinate.js.map