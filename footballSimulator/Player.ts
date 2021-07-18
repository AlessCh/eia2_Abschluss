namespace footballSimulator {

  export class Player implements Movable {
    currentPosition: Coordinate;
    defaultPosition: Coordinate;
    team: string;
    jersy: number;
    ballOwner: boolean;
    jersyColor: string;
    speed: number;
    precision: number;
    triedToGetBall: boolean;

    constructor(
      currentplayerPosition: Coordinate,
      defaultplayerPosition: Coordinate,
      team: string,
      jersy: number,
      ballOwner: boolean,
      jerseyColor: string,
      speed: number,
      precision: number
    ) {
      this.currentPosition = currentplayerPosition;
      this.defaultPosition = defaultplayerPosition;
      this.team = team;
      this.jersy = jersy;
      this.ballOwner = ballOwner;
      this.jersyColor = jerseyColor;
      this.speed = speed;
      this.precision = precision;
      this.triedToGetBall = false;
    }

    move(): void {
      throw new Error("Method not implemented.");
    }
    draw(): void {
      //const canvasGround = getCanvas();
      const ground = getGround();

      ground.save();
      ground.beginPath();
      ground.arc(
        this.currentPosition.x,
        this.currentPosition.y,
        20,
        0,
        Math.PI * 2
      );
      ground.closePath();
      ground.fillStyle = this.jersyColor;
      ground.fill();
      ground.restore();

      // Jersey Number
      ground.save();
      ground.fillStyle = "black";
      ground.font = "20px serif";
      ground.fillText(
        String(this.jersy),
        this.currentPosition.x,
        this.currentPosition.y,
        20
      );
      ground.restore();

      // Player range
      // ground.save();
      // ground.beginPath();
      // ground.arc(
      //   this.defaultPosition.x,
      //   this.defaultPosition.y,
      //   300,
      //   0,
      //   2 * Math.PI
      // );
      // ground.strokeStyle = this.jersyColor;
      // ground.stroke();
      // ground.restore();
    }

    moveTo(position: Coordinate): void {
      const difference = this.currentPosition.getDistanceTo(position);
      if (difference < 300 && difference > 10) {
        const deltaX = position.x - this.currentPosition.x;
        const deltaY = position.y - this.currentPosition.y;
        const angle = Math.atan2(deltaY, deltaX);
        this.currentPosition.x += 1 * this.speed * Math.cos(angle);
        this.currentPosition.y += 1 * this.speed * Math.sin(angle);
      }
    }
  }
}