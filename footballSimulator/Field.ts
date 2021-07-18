//inspiration to the field design from lisa herbig https://lisaherbig.github.io/EIA2-SoSe2021/Endaufgabe_Fu%C3%9FballSimulation/Simulation.html

namespace footballSimulator {
  let canvasGround: HTMLCanvasElement;
 // let ground: CanvasRenderingContext2D;

  export function getCanvas(): HTMLCanvasElement {
    if (!canvasGround) {
      canvasGround = document.getElementById("playground") as HTMLCanvasElement;
    }
    return canvasGround;
  }

  export function getGround(): CanvasRenderingContext2D {
    const canvasGround = getCanvas();
    return canvasGround.getContext("2d")!;
  }

  export function getGroundImage(): ImageData {
    const ground = getGround();
    return ground.getImageData(0, 0, ground.canvas.width, ground.canvas.height);
  }

  export function drawField(): void {
    const canvasGround = getCanvas();
    const ground = getGround();

    //inner field
    ground.save();
    ground.beginPath();
    ground.fillStyle = "darkgreen";
    ground.fillRect(0, 0, canvasGround.width, canvasGround.height);
    ground.strokeStyle = "white";
    ground.lineWidth = 2;
    ground.moveTo(
      (canvasGround.width / 110) * 5, //52.7
      (canvasGround.height / 75) * 5 //50
    );
    ground.lineTo(
      (canvasGround.width / 110) * 105, //1107
      (canvasGround.height / 75) * 5 //50
    );
    ground.lineTo(
      (canvasGround.width / 110) * 105, //1107
      (canvasGround.height / 75) * 70 //709
    );
    ground.lineTo(
      (canvasGround.width / 110) * 5, //52.7
      (canvasGround.height / 75) * 70 //709
    );
    ground.closePath();
    ground.fill();
    ground.stroke();
    ground.restore();
    ///done

    //middle line
    ground.save();
    ground.beginPath();
    ground.strokeStyle = "white";
    ground.lineWidth = 2;
    ground.moveTo(canvasGround.width / 2, (canvasGround.height / 75) * 5); //580,50
    ground.lineTo(canvasGround.width / 2, (canvasGround.height / 75) * 70); //580,709
    ground.closePath();
    ground.stroke();
    ground.restore();
    //done

    //middle circle
    ground.save();
    ground.beginPath();
    ground.strokeStyle = "white";
    ground.lineWidth = 2;
    ground.arc(
      canvasGround.width / 2, //580
      canvasGround.height / 2, //380  --> (580, 380)  middle of the field
      (canvasGround.width / 110) * 8, 0, 2 * Math.PI); //circle in middle with size approx 84
    ground.closePath();
    ground.stroke();
    ground.restore();
    //done

    //penalty area
    function drawPenaltyArea(_outerLine: number, _distance: number): void {
      ground.save();
      ground.beginPath();
      ground.strokeStyle = "white";
      ground.lineWidth = 2;
      ground.moveTo(
        (canvasGround.width / 110) * _outerLine, //10.54 * outerline
        canvasGround.height / 2 + 110 //490
      );
      ground.lineTo(
        (canvasGround.width / 110) * _distance, //10.54 * distance
        canvasGround.height / 2 + 110 //490
      );
      ground.lineTo(
        (canvasGround.width / 110) * _distance, //10.54 * distance
        canvasGround.height / 2 - 110 //270
      );
      ground.lineTo(
        (canvasGround.width / 110) * _outerLine, ////10.54 * outerline
        canvasGround.height / 2 - 110 //270
      );
      ground.closePath();
      ground.stroke();
      ground.restore();
    }
    //done

    drawPenaltyArea(5, 21.5); //positions x/y, field drawn on left side
    drawPenaltyArea(105, 88.5); //field drawn on right side

    //goal area
    function drawGoalArea(_outerLine: number, _distance: number): void {
      ground.save();
      ground.beginPath();
      ground.strokeStyle = "white";
      ground.lineWidth = 2;
      ground.moveTo(
        (canvasGround.width / 110) * _outerLine, //10.54 * outerline
        canvasGround.height / 2 + 50 //430
      );
      ground.lineTo(
        (canvasGround.width / 110) * _distance, //10.54 * distance
        canvasGround.height / 2 + 50 //430
      );
      ground.lineTo(
        (canvasGround.width / 110) * _distance, //10.54 * distance
        canvasGround.height / 2 - 50 //330
      );
      ground.lineTo(
        (canvasGround.width / 110) * _outerLine, //10.54 * outerline
        canvasGround.height / 2 - 50 //330
      );
      ground.closePath();
      ground.stroke();
      ground.restore();
    }
    //done

    drawGoalArea(5, 10.5); //left
    drawGoalArea(105, 99.5); //right

    //circle for penalty area
    function drawArcPentaltyArea(_start: number, _anticlockwise: boolean): void {
      ground.save();
      ground.beginPath();
      ground.strokeStyle = "white";
      ground.lineWidth = 2;
      ground.arc(
        (canvasGround.width / 110) * _start, //10.54*start
        canvasGround.height / 2, //380
        60, //size 60
        90 * (Math.PI / 180),
        270 * (Math.PI / 180),
        _anticlockwise //draws the arc counter-clockwise between the start and end angles
      );
      ground.closePath();
      ground.stroke();
      ground.restore();
    }
    //done

    drawArcPentaltyArea(21.5, true); //left
    drawArcPentaltyArea(88.5, false); //right

    //goal
    function drawGoal(_outerLine: number, _end: number): void {
      ground.save();
      ground.beginPath();
      ground.strokeStyle = "white";
      ground.lineWidth = 2;
      ground.moveTo(
        (canvasGround.width / 110) * _outerLine, //10.54 * outerline
        canvasGround.height / 2 + 40 //420
      );
      ground.lineTo(
        (canvasGround.width / 110) * _end,
        canvasGround.height / 2 + 40 //420
      );
      ground.lineTo(
        (canvasGround.width / 110) * _end,
        canvasGround.height / 2 - 40 //340
      );
      ground.lineTo(
        (canvasGround.width / 110) * _outerLine,
        canvasGround.height / 2 - 40 //340
      );
      ground.closePath();
      ground.stroke();
      ground.restore();
    }

    drawGoal(5, 1); //left
    drawGoal(105, 109); //right
  }
}