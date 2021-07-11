"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    function pitch() {
        //draw field
        Abschlussarbeit.crc2.fillStyle = "darkgreen";
        Abschlussarbeit.crc2.fillRect(0, 0, Abschlussarbeit.crc2.canvas.width, Abschlussarbeit.crc2.canvas.height);
        //big gate left
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.moveTo(0, 190);
        Abschlussarbeit.crc2.lineTo(150, 190);
        Abschlussarbeit.crc2.lineTo(150, 570);
        Abschlussarbeit.crc2.lineTo(0, 570);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //small left gate
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.moveTo(0, 285);
        Abschlussarbeit.crc2.lineTo(75, 285);
        Abschlussarbeit.crc2.lineTo(75, 475);
        Abschlussarbeit.crc2.lineTo(0, 475);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //half circle left
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.arc(130, 380, 60, 5.05, 2.39 * Math.PI);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //big gate right
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.moveTo(1160, 190);
        Abschlussarbeit.crc2.lineTo(1010, 190);
        Abschlussarbeit.crc2.lineTo(1010, 570);
        Abschlussarbeit.crc2.lineTo(1160, 570);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //small right gate
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.moveTo(1160, 285);
        Abschlussarbeit.crc2.lineTo(1085, 285);
        Abschlussarbeit.crc2.lineTo(1085, 475);
        Abschlussarbeit.crc2.lineTo(1160, 475);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //half circle right
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.arc(1030, 380, 60, 1.9, 1.39 * Math.PI);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //line
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.moveTo(580, 0);
        Abschlussarbeit.crc2.lineTo(580, 760);
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
        //circle
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.strokeStyle = "white";
        Abschlussarbeit.crc2.arc(580, 380, 100, 0, 2 * Math.PI);
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.closePath();
    }
    Abschlussarbeit.pitch = pitch;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=field.js.map