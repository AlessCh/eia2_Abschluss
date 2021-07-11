namespace Abschlussarbeit {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let golden: number = 0.62;

    let moveables: Moveable[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;
        
        drawField();
        drawGate();
        drawFielddetails();
        createReferee(1);
        //createBall(1);
        //createPlayer(22);
        createLinejudge(2);
        window.setInterval(update, 20);
    }

    function drawField(): void {
        crc2.fillStyle = "darkgreen";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawGate(): void {
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
    } 

    function drawFielddetails(): void {
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
    
    function createReferee(nReferee: number): void {
        for (let i: number = 0; i < nReferee; i++) {
            let referee: Referee = new Referee(); //name of subclass, new referee created
            moveables.push(referee); //pushed into players array
        }
    }

    function createLinejudge(_nLinejudge: number): void {
        for (let i:  number = 0; i < _nLinejudge; i++) {
            let linejudge: Linejudge = new Linejudge();  //name of subclass, new linejudge created
            moveables.push(linejudge); // pushed into players array
        }
    }

    function update(): void {
        for (let moveable of moveables) {
            moveable.draw();
            moveable.move(1);
        }
    }
}