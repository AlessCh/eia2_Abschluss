namespace footballSimulator {
  export class Ball implements Movable {
    currentPosition: Coordinate;
    ownedBy: Player | undefined;

    constructor(position: Coordinate, player?: Player) {
      this.currentPosition = position;
      this.ownedBy = player;
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
      return true;D
    }

    draw(): void {
      //const canvasGround = getCanvas();
      const ground = getGround();
      ground.save();
      ground.beginPath();
      ground.fillStyle = "white";
      ground.arc(
        this.currentPosition.x,
        this.currentPosition.y,
        10,
        0,
        2 * Math.PI
      );
      ground.closePath();
      ground.fill();
      ground.restore();
    }
  }
}