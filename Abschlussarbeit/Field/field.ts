namespace Abschlussarbeit {

    export function pitch(): void {

    //draw field
    crc2.fillStyle = "darkgreen";
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    
    //big gate left
    crc2.beginPath();
    crc2.moveTo(0, 190);
    crc2.lineTo(150, 190);
    crc2.lineTo(150, 570);
    crc2.lineTo(0, 570);
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //small left gate
    crc2.beginPath();
    crc2.moveTo(0, 285);
    crc2.lineTo(75, 285);
    crc2.lineTo(75, 475);
    crc2.lineTo(0, 475);
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //half circle left
    crc2.beginPath();
    crc2.arc(130, 380, 60, 5.05, 2.39 *  Math.PI); 
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //big gate right
    crc2.beginPath();
    crc2.moveTo(1160, 190);
    crc2.lineTo(1010, 190);
    crc2.lineTo(1010, 570);
    crc2.lineTo(1160, 570);
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //small right gate
    crc2.beginPath();
    crc2.moveTo(1160, 285);
    crc2.lineTo(1085, 285);
    crc2.lineTo(1085, 475);
    crc2.lineTo(1160, 475);
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //half circle right
    crc2.beginPath();
    crc2.arc(1030, 380, 60, 1.9, 1.39 *  Math.PI); 
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //line
    crc2.beginPath();
    crc2.moveTo(580, 0);
    crc2.lineTo(580, 760);
    crc2.strokeStyle = "white";
    crc2.stroke();
    crc2.closePath();

    //circle
    crc2.beginPath();
    crc2.strokeStyle = "white";
    crc2.arc(580, 380, 100, 0, 2 * Math.PI);
    crc2.stroke();
    crc2.closePath();
}
}