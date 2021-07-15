namespace footballSimulator {
  export interface Movable {
    currentPosition: Coordinate;

    move(): void;

    draw(): void;
  }
}
