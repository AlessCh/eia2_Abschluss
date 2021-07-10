"use strict";
var main;
(function (main) {
    class Moveable {
        constructor(_position) {
            let x = 900 * Math.random();
            let y = 600 * Math.random();
            this.position = new main.Vector(x, y);
            this.size = 10;
        }
        move(_timeslice) {
            //...
        }
        draw() {
            //draw
        }
    }
    main.Moveable = Moveable;
})(main || (main = {}));
//# sourceMappingURL=moveable.js.map