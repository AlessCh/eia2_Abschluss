"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Player extends Abschlussarbeit.Person {
        constructor(_pos, _num) {
            super(_pos);
            this.speed = Math.random() * (Abschlussarbeit.pace - 0.02) + 0.02; //mindesten 0.02 schnell maximal eintrag von pace schnell
            this.balance = Math.floor(Math.random() * (Abschlussarbeit.shotMax - Abschlussarbeit.shotMin) + Abschlussarbeit.shotMin); //Nummer von 70 bis 100 über Form, verwenden in Ball.move() bei newPos.x und y
            this.colorNumber = "#FFFFFF";
            this.position = _pos;
            this.oldPosition = _pos.copy();
            this.number = _num;
            console.log(this.speed);
            if (Abschlussarbeit.players.length <= 10) {
                this.color = Abschlussarbeit.homeColor.toString();
            }
            else {
                this.color = Abschlussarbeit.awayColor.toString();
            }
        }
        draw() {
            Abschlussarbeit.crc2.translate(this.position.x - 20, this.position.y - 25); //Um Verschiebung beim zeichnen auszugleichen
            let player = new Path2D();
            player.moveTo(20, 25);
            player.lineTo(20, 55);
            player.lineTo(60, 55);
            player.lineTo(60, 25);
            player.lineTo(75, 25);
            player.lineTo(75, 15);
            player.lineTo(60, 5);
            player.moveTo(20, 25);
            player.lineTo(5, 25);
            player.lineTo(5, 15);
            player.lineTo(20, 5);
            player.lineTo(60, 5);
            Abschlussarbeit.crc2.lineWidth = 4;
            Abschlussarbeit.crc2.strokeStyle = "black";
            Abschlussarbeit.crc2.fillStyle = this.color;
            Abschlussarbeit.crc2.save();
            Abschlussarbeit.crc2.scale(0.5, 0.5);
            Abschlussarbeit.crc2.stroke(player);
            Abschlussarbeit.crc2.fill(player);
            Abschlussarbeit.crc2.restore();
            Abschlussarbeit.crc2.fillStyle = this.colorNumber;
            Abschlussarbeit.crc2.font = "10px Arial";
            if (this.number >= 10) {
                Abschlussarbeit.crc2.strokeText(this.number.toString(), 14, 21);
                Abschlussarbeit.crc2.fillText(this.number.toString(), 14, 21);
            }
            else {
                Abschlussarbeit.crc2.strokeText(" " + this.number.toString(), 14, 21);
                Abschlussarbeit.crc2.fillText(" " + this.number.toString(), 14, 21);
            }
            Abschlussarbeit.crc2.resetTransform();
        }
        move() {
            //console.log(ball.position.x, this.position.x);
            let vergX = Abschlussarbeit.ball.position.x - this.position.x;
            let vergY = Abschlussarbeit.ball.position.y - this.position.y;
            let direction = new Abschlussarbeit.Vector(vergX, vergY);
            if (vergX <= 0) {
                vergX = vergX * (-1);
            }
            if (vergY <= 0) {
                vergY = vergY * (-1);
            }
            if (vergX <= 80 && vergY <= 105) {
                if (vergX > 10 || vergY > 10) {
                    direction.scale(this.speed);
                    this.position.add(direction);
                }
                else {
                    console.log("Stop!");
                    Abschlussarbeit.stop = true;
                    //back = false;
                }
            }
        }
        moveBack() {
            let directionX = this.oldPosition.x - this.position.x;
            let directionY = this.oldPosition.y - this.position.y;
            let direction = new Abschlussarbeit.Vector(directionX, directionY);
            direction.scale(this.speed);
            this.position.add(direction);
        }
        playerCard(_vergleich) {
            if (_vergleich == 1) {
                let div = document.getElementById("card1");
                div.innerHTML = "";
                div.style.backgroundColor = Abschlussarbeit.homeColor.toString();
                let cardNumber = document.createElement("h3");
                cardNumber.innerHTML = this.number.toString();
                div.appendChild(cardNumber);
                let cardName = document.createElement("h3");
                cardName.innerHTML = Abschlussarbeit.name[Abschlussarbeit.spieler1][0].toString();
                div.appendChild(cardName);
                let cardPos = document.createElement("h5");
                cardPos.innerHTML = Abschlussarbeit.name[Abschlussarbeit.spieler1][1].toString();
                div.appendChild(cardPos);
                let cardImg = document.createElement("img");
                cardImg.setAttribute("src", "Flags/" + Abschlussarbeit.name[Abschlussarbeit.spieler1][2].toString() + ".png");
                cardImg.style.width = "30px";
                cardImg.style.height = "20px";
                div.appendChild(cardImg);
                let cardSpeed = document.createElement("p");
                cardSpeed.innerHTML = "Pace: " + Math.floor(this.speed * 1000);
                div.appendChild(cardSpeed);
                let cardBalance = document.createElement("p");
                cardBalance.innerHTML = "Shot: " + this.balance;
                div.appendChild(cardBalance);
                let cardImg2 = document.createElement("img");
                cardImg2.setAttribute("src", "Players/" + Abschlussarbeit.name[Abschlussarbeit.spieler1][0].toString() + ".png");
                cardImg2.style.width = "161px";
                cardImg2.style.height = "189px";
                div.appendChild(cardImg2);
                //Hier infos für 1. Team rein! (Name, Pace, Schuss, Position, Hintergrundfarbe der Karte usw..)
            }
            else {
                let div = document.getElementById("card2");
                div.innerHTML = "";
                div.style.backgroundColor = Abschlussarbeit.awayColor.toString();
                let cardNumber = document.createElement("h3");
                cardNumber.innerHTML = this.number.toString();
                div.appendChild(cardNumber);
                let cardName = document.createElement("h3");
                cardName.innerHTML = Abschlussarbeit.name[Abschlussarbeit.spieler2][0].toString();
                div.appendChild(cardName);
                let cardPos = document.createElement("h5");
                cardPos.innerHTML = Abschlussarbeit.name[Abschlussarbeit.spieler2][1].toString();
                div.appendChild(cardPos);
                let cardImg = document.createElement("img");
                cardImg.setAttribute("src", "Flags/" + Abschlussarbeit.name[Abschlussarbeit.spieler2][2].toString() + ".png");
                cardImg.style.width = "30px";
                cardImg.style.height = "20px";
                div.appendChild(cardImg);
                let cardSpeed = document.createElement("p");
                cardSpeed.innerHTML = "Pace: " + Math.floor(this.speed * 1000);
                div.appendChild(cardSpeed);
                let cardBalance = document.createElement("p");
                cardBalance.innerHTML = "Shot: " + this.balance;
                div.appendChild(cardBalance);
                let cardImg2 = document.createElement("img");
                cardImg2.setAttribute("src", "Players/" + Abschlussarbeit.name[Abschlussarbeit.spieler2][0].toString() + ".png");
                cardImg2.style.width = "161px";
                cardImg2.style.height = "189px";
                div.appendChild(cardImg2);
                //Hier infos für 2. Team rein! (Name, Pace, Schuss, Position, Hintergrundfarbe der Karte usw..)
            }
        }
    }
    Abschlussarbeit.Player = Player;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=player.js.map