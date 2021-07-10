namespace main {

    export abstract class Moveable {
        protected color: string;
        protected size: number;
        protected position: Vector;
        
        constructor(_position?: Vector) {
            let x: number = 900 * Math.random();
            let y: number = 600 * Math.random();
            
            this.position = new Vector(x, y);
            this.size = 10;
    } 

    public move(_timeslice: number): void {
        //...
        }

    public draw(): void {
        //draw
    }
    }
}