namespace footballSimulator {
    export class Referee implements Movable {
        public currentPosition: Coordinate;
        public role: RefereeRole;

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
            const ground = getGround();

            ground.save();
            ground.beginPath();
            ground.fillStyle = this.role === RefereeRole.GROUND_REF ? "darkred" : "grey";
            ground.strokeStyle = "yellow";
            ground.lineWidth = 2;
            ground.arc(
                this.currentPosition.x,
                this.currentPosition.y - 40,
                20,
                0,
                Math.PI * 2
            );
            ground.closePath();
            ground.fill();
            ground.stroke();
            ground.restore();

            // referee & line judge initials
            ground.save();
            ground.beginPath();
            ground.fillStyle = "white";
            ground.font = "20px serif";
            ground.fillText(
                String("-"),
                this.currentPosition.x - 3,
                this.currentPosition.y - 35,
                20
            );
            ground.closePath();
            ground.restore();
        }
    }

    export enum RefereeRole {
        GROUND_REF,
        LINE_REF
    }
}