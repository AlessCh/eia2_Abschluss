namespace footballSimulator {
  export class Referee implements Movable {
    currentPosition: Coordinate;
    role: RefereeRole;

    constructor(position: Coordinate, role: RefereeRole) {
      this.currentPosition = position;
      this.role = role;
    }

    move(): void {
      throw new Error("Method not implemented.");
    }

    moveTo(position: Coordinate): boolean {
      const difference = this.currentPosition.getDistanceTo(position);
      if (difference > 10) {
        const deltaX = position.x - this.currentPosition.x;
        const deltaY = position.y - this.currentPosition.y;
        const angle = Math.atan2(deltaY, deltaX);
        this.currentPosition.x += 2 * Math.cos(angle);
        this.currentPosition.y += 2 * Math.sin(angle);
        return false;
      }
      return true;
    }

    draw(): void {
      const canvasGround = getCanvas();
      const ground = getGround();

      ground.save();
      ground.beginPath();
      ground.moveTo(
        this.currentPosition.x - (canvasGround.width / 110) * 2,
        this.currentPosition.y - (canvasGround.height / 75) * 2
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3,
        this.currentPosition.y - (canvasGround.height / 75) * 2
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 2
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        (canvasGround.width / 110) * 1,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 2 +
        (canvasGround.height / 75) * 1
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1),
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 2
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1) -
        (canvasGround.width / 110) * 2,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 4
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1) -
        (canvasGround.width / 110) * 5,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 4
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1) -
        (canvasGround.width / 110) * 7,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 2
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1) -
        (canvasGround.width / 110) * 6,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 1
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2 +
        (canvasGround.width / 110) * 3 +
        2 * ((canvasGround.width / 110) * 1) -
        (canvasGround.width / 110) * 5,
        this.currentPosition.y -
        (canvasGround.height / 75) * 2 -
        (canvasGround.height / 75) * 2
      );
      ground.closePath();
      ground.fillStyle =
        this.role === RefereeRole.GROUND_REF ? "#fcba03" : "black";
      ground.fill();
      ground.restore();

      ground.save();
      ground.beginPath();
      ground.moveTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2.5 +
        canvasGround.width / 110 +
        10,
        this.currentPosition.y - (canvasGround.height / 75) * 5
      );
      ground.lineTo(
        this.currentPosition.x -
        (canvasGround.width / 110) * 2.5 +
        canvasGround.width / 110 +
        10,
        this.currentPosition.y - (canvasGround.height / 75) * 3
      );
      ground.lineWidth = 3;
      ground.stroke();
      ground.restore();
    }
  }

  export enum RefereeRole {
    GROUND_REF,
    LINE_REF,
  }
}
