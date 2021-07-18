"use strict";
var footballSimulator;
(function (footballSimulator) {
    let canvasGround;
    // let ground: CanvasRenderingContext2D;
    function getCanvas() {
        if (!canvasGround) {
            canvasGround = document.getElementById("playground");
        }
        return canvasGround;
    }
    footballSimulator.getCanvas = getCanvas;
    function getGround() {
        const canvasGround = getCanvas();
        return canvasGround.getContext("2d");
    }
    footballSimulator.getGround = getGround;
    function getGroundImage() {
        const ground = getGround();
        return ground.getImageData(0, 0, ground.canvas.width, ground.canvas.height);
    }
    footballSimulator.getGroundImage = getGroundImage;
    function drawField() {
        const canvasGround = getCanvas();
        const ground = getGround();
        ground.fillStyle = "darkgreen";
        ground.fill();
        ground.fillRect(0, 0, canvasGround.width, canvasGround.height);
        ground.save();
        ground.beginPath();
        ground.moveTo((canvasGround.width / 110) * 5, (canvasGround.height / 75) * 5);
        ground.lineTo((canvasGround.width / 110) * 105, (canvasGround.height / 75) * 5);
        ground.lineTo((canvasGround.width / 110) * 105, (canvasGround.height / 75) * 70);
        ground.lineTo((canvasGround.width / 110) * 5, (canvasGround.height / 75) * 70);
        ground.closePath();
        ground.strokeStyle = "white";
        ground.lineWidth = 5;
        ground.stroke();
        ground.restore();
        ground.save();
        ground.beginPath();
        ground.moveTo(canvasGround.width / 2, (canvasGround.height / 75) * 5);
        ground.lineTo(canvasGround.width / 2, (canvasGround.height / 75) * 70);
        ground.closePath();
        ground.strokeStyle = "white";
        ground.lineWidth = 5;
        ground.stroke();
        ground.restore();
        ground.save();
        ground.beginPath();
        ground.arc(canvasGround.width / 2, canvasGround.height / 2, 4, 0, 2 * Math.PI);
        ground.strokeStyle = "white";
        ground.lineWidth = 5;
        ground.stroke();
        ground.restore();
        ground.save();
        ground.beginPath();
        ground.arc(canvasGround.width / 2, canvasGround.height / 2, (canvasGround.width / 110) * 9, 0, 2 * Math.PI);
        ground.closePath();
        ground.strokeStyle = "white";
        ground.lineWidth = 5;
        ground.stroke();
        ground.restore();
        function drawPenaltyArea(_outerLine, _distance) {
            ground.save();
            ground.beginPath();
            ground.moveTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 + 110);
            ground.lineTo((canvasGround.width / 110) * _distance, canvasGround.height / 2 + 110);
            ground.lineTo((canvasGround.width / 110) * _distance, canvasGround.height / 2 - 110);
            ground.lineTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 - 110);
            ground.closePath();
            ground.strokeStyle = "white";
            ground.lineWidth = 5;
            ground.stroke();
            ground.restore();
        }
        drawPenaltyArea(5, 21.5);
        drawPenaltyArea(105, 88.5);
        function drawGoalArea(_outerLine, _distance) {
            ground.save();
            ground.beginPath();
            ground.moveTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 + 50);
            ground.lineTo((canvasGround.width / 110) * _distance, canvasGround.height / 2 + 50);
            ground.lineTo((canvasGround.width / 110) * _distance, canvasGround.height / 2 - 50);
            ground.lineTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 - 50);
            ground.closePath();
            ground.strokeStyle = "white";
            ground.lineWidth = 5;
            ground.stroke();
            ground.restore();
        }
        drawGoalArea(5, 10.5);
        drawGoalArea(105, 99.5);
        function drawArcPentaltyArea(_start, _anticlockwise) {
            ground.save();
            ground.beginPath();
            ground.arc((canvasGround.width / 110) * _start, canvasGround.height / 2, 50, 90 * (Math.PI / 180), 270 * (Math.PI / 180), _anticlockwise);
            ground.closePath();
            ground.strokeStyle = "white";
            ground.lineWidth = 5;
            ground.stroke();
            ground.restore();
        }
        drawArcPentaltyArea(21.5, true);
        drawArcPentaltyArea(88.5, false);
        function drawPentaltySpot(_center) {
            ground.save();
            ground.beginPath();
            ground.arc((canvasGround.width / 110) * _center, canvasGround.height / 2, 4, 0, 360);
            ground.closePath();
            ground.fillStyle = "white";
            ground.lineWidth = 5;
            ground.fill();
            ground.restore();
        }
        drawPentaltySpot(15.75);
        drawPentaltySpot(94.25);
        function drawGoal(_outerLine, _end) {
            ground.save();
            ground.beginPath();
            ground.moveTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 + 40);
            ground.lineTo((canvasGround.width / 110) * _end, canvasGround.height / 2 + 40);
            ground.lineTo((canvasGround.width / 110) * _end, canvasGround.height / 2 - 40);
            ground.lineTo((canvasGround.width / 110) * _outerLine, canvasGround.height / 2 - 40);
            ground.closePath();
            ground.strokeStyle = "white";
            ground.lineWidth = 5;
            ground.stroke();
            ground.restore();
        }
        drawGoal(5, 1);
        drawGoal(105, 109);
        function drawNet(_distance1, _distance2, _distance3, _distance4, _distance5) {
            ground.save();
            ground.beginPath();
            ground.moveTo((canvasGround.width / 110) * _distance2, canvasGround.height / 2 + 40);
            ground.lineTo((canvasGround.width / 110) * _distance2, canvasGround.height / 2 - 40);
            ground.moveTo((canvasGround.width / 110) * _distance3, canvasGround.height / 2 - 40);
            ground.lineTo((canvasGround.width / 110) * _distance3, canvasGround.height / 2 + 40);
            ground.moveTo((canvasGround.width / 110) * _distance4, canvasGround.height / 2 + 40);
            ground.lineTo((canvasGround.width / 110) * _distance4, canvasGround.height / 2 - 40);
            ground.moveTo((canvasGround.width / 110) * _distance1, canvasGround.height / 2 + 20);
            ground.lineTo((canvasGround.width / 110) * _distance5, canvasGround.height / 2 + 20);
            ground.moveTo((canvasGround.width / 110) * _distance1, canvasGround.height / 2 + 0);
            ground.lineTo((canvasGround.width / 110) * _distance5, canvasGround.height / 2 + 0);
            ground.moveTo((canvasGround.width / 110) * _distance1, canvasGround.height / 2 - 20);
            ground.lineTo((canvasGround.width / 110) * _distance5, canvasGround.height / 2 - 20);
            ground.closePath();
            ground.strokeStyle = "white";
            ground.stroke();
            ground.restore();
        }
        drawNet(1, 2, 3, 4, 5);
        drawNet(109, 108, 107, 106, 105);
    }
    footballSimulator.drawField = drawField;
})(footballSimulator || (footballSimulator = {}));
//# sourceMappingURL=Field.js.map