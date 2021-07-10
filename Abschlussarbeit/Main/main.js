"use strict";
var main;
(function (main) {
    window.addEventListener("load", handleLoad);
    main.golden = 0.62;
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        main.crc2 = canvas.getContext("2d");
        drawField();
        drawGate();
        drawFielddetails();
        createReferee(1);
        createLinejudge(2);
        window.setInterval(update, 20);
    }
    function drawField() {
        main.crc2.fillStyle = "darkgreen";
        main.crc2.fillRect(0, 0, main.crc2.canvas.width, main.crc2.canvas.height);
    }
    function drawGate() {
        //big gate left
        main.crc2.beginPath();
        main.crc2.moveTo(0, 190);
        main.crc2.lineTo(150, 190);
        main.crc2.lineTo(150, 570);
        main.crc2.lineTo(0, 570);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //small left gate
        main.crc2.beginPath();
        main.crc2.moveTo(0, 285);
        main.crc2.lineTo(75, 285);
        main.crc2.lineTo(75, 475);
        main.crc2.lineTo(0, 475);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //half circle left
        main.crc2.beginPath();
        main.crc2.arc(130, 380, 60, 5.05, 2.39 * Math.PI);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //big gate right
        main.crc2.beginPath();
        main.crc2.moveTo(1160, 190);
        main.crc2.lineTo(1010, 190);
        main.crc2.lineTo(1010, 570);
        main.crc2.lineTo(1160, 570);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //small right gate
        main.crc2.beginPath();
        main.crc2.moveTo(1160, 285);
        main.crc2.lineTo(1085, 285);
        main.crc2.lineTo(1085, 475);
        main.crc2.lineTo(1160, 475);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //half circle right
        main.crc2.beginPath();
        main.crc2.arc(1030, 380, 60, 1.9, 1.39 * Math.PI);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
    }
    function drawFielddetails() {
        //line
        main.crc2.beginPath();
        main.crc2.moveTo(580, 0);
        main.crc2.lineTo(580, 760);
        main.crc2.strokeStyle = "white";
        main.crc2.stroke();
        main.crc2.closePath();
        //circle
        main.crc2.beginPath();
        main.crc2.strokeStyle = "white";
        main.crc2.arc(580, 380, 100, 0, 2 * Math.PI);
        main.crc2.stroke();
        main.crc2.closePath();
    }
    function createReferee(nReferee) {
        for (let i = 0; i < nReferee; i++) {
            let referee = new Referee(); //name of subclass, new referee created
            moveables.push(referee); //pushed into players array
        }
    }
    function createLinejudge(_nLinejudge) {
        for (let i = 0; i < _nLinejudge; i++) {
            let linejudge = new Linejudge(); //name of subclass, new linejudge created
            moveables.push(linejudge); // pushed into players array
        }
    }
    function update() {
        for (let moveable of moveables) {
            moveable.draw();
            moveable.move(1);
        }
    }
})(main || (main = {}));
//# sourceMappingURL=main.js.map