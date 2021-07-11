"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    window.addEventListener("load", handleLoad);
    Abschlussarbeit.homeColor = "#FFFFFF";
    Abschlussarbeit.awayColor = "#0000FF";
    Abschlussarbeit.pace = 0.08;
    Abschlussarbeit.shotMin = 60;
    Abschlussarbeit.shotMax = 100;
    let numbers = [1, 3, 4, 5, 8, 6, 10, 22, 14, 9, 7, 1, 4, 2, 3, 6, 11, 7, 10, 17, 9, 21];
    Abschlussarbeit.name = [["Neuer", "TW", "de"], ["Hummels", "IV", "de"], ["Virgil", "IV", "nl"], ["Chiellini", "IV", "it"], ["Gnabry", "RM", "de"], ["Veratti", "ZDM", "it"], ["Sane", "LM", "de"], ["Sancho", "ZOM", "en"], ["Hazard", "LF", "be"], ["Bale", "RF", "wl"], ["Ronaldo", "ST", "pr"], ["Sommer", "TW", "sw"], ["Ramos", "IV", "sp"], ["Alaba", "IV", "oe"], ["Varan", "IV", "fr"], ["Kimmich", "ZDM", "de"], ["De Bruyne", "ZOM", "be"], ["Pogba", "ZM", "fr"], ["Insigne", "LM", "it"], ["Rashford", "RM", "en"], ["Mbappe", "ST", "fr"], ["Kane", "ST", "en"]];
    let pos = [[50, 260], [120, 125], [160, 245], [90, 375], [240, 425], [320, 325], [390, 195], [430, 395], [620, 125], [690, 405], [560, 295], [755, 260], [570, 415], [660, 330], [720, 165], [540, 195], [420, 295], [480, 85], [250, 75], [100, 455], [180, 345], [220, 225]];
    let posReff = [[10, 0], [750, 470], [420, 210]];
    Abschlussarbeit.reffs = [];
    Abschlussarbeit.players = [];
    Abschlussarbeit.stop = false;
    let imageData;
    function handleLoad() {
        Abschlussarbeit.canvas = document.querySelector("canvas"); //canvas erstellen
        Abschlussarbeit.crc2 = Abschlussarbeit.canvas.getContext("2d");
        Abschlussarbeit.pitch(); //Feld generieren
        imageData = Abschlussarbeit.crc2.getImageData(0, 0, Abschlussarbeit.canvas.width, Abschlussarbeit.canvas.height); //Bild vom Feld abspeichern 
        let forms = document.getElementById("form");
        forms.addEventListener("change", handleChange);
        let starter = document.getElementById("starter");
        starter.addEventListener("click", los);
    }
    function handleChange(_event) {
        let target = _event.target;
        if (target.id == "Trikotfarbe1") {
            Abschlussarbeit.homeColor = target.value;
        }
        if (target.id == "Trikotfarbe2") {
            Abschlussarbeit.awayColor = target.value;
        }
        if (target.id == "Pace") {
            Abschlussarbeit.pace = Number(target.value);
        }
        if (target.id == "minimum") {
            Abschlussarbeit.shotMin = Number(target.value);
        }
        if (target.id == "maximum") {
            Abschlussarbeit.shotMax = Number(target.value);
        }
    }
    function los() {
        let starter = document.getElementById("starter");
        starter.innerHTML = "reload";
        starter.addEventListener("click", function () { window.location.reload(); });
        generatePlayer(); //Player, Schiri und Ball generieren
        Abschlussarbeit.canvas.addEventListener("click", shotBall); //Dem Ball den Click Listener geben
        let cardButton1 = document.getElementById("next1"); //Spielerinfo button (1. Team) mit Click Listener anlegen
        cardButton1.addEventListener("click", nextCard); //Spielerinfo Inhalte (1. Team) generieren
        let cardButton2 = document.getElementById("next2"); //Spielerinfo button (2. Team) mit Click Listener anlegen
        cardButton2.addEventListener("click", nextCard); //Spielerinfo Inhalte (2. Team) generieren
        //console.log(ball.position.x, ball.position.y);
        window.setInterval(animate, 50); //Spieler und Ball animieren
    }
    function generatePlayer() {
        for (let i = 0; i <= 21; i++) {
            let player = new Abschlussarbeit.Player(new Abschlussarbeit.Vector(pos[i][0], pos[i][1]), numbers[i]);
            player.draw();
            Abschlussarbeit.players.push(player);
            console.log(player.position.x);
        }
        console.log(Abschlussarbeit.players);
        for (let i = 0; i <= 2; i++) {
            let reff = new Abschlussarbeit.Reff(new Abschlussarbeit.Vector(posReff[i][0], posReff[i][1]));
            reff.draw();
            Abschlussarbeit.reffs.push(reff);
        }
        let fotball = new Abschlussarbeit.Ball(new Abschlussarbeit.Vector(380, Abschlussarbeit.canvas.height / 2));
        fotball.draw();
        Abschlussarbeit.ball = fotball;
    }
    function animate() {
        //requestAnimationFrame(animate);
        Abschlussarbeit.crc2.fillRect(0, 0, Abschlussarbeit.crc2.canvas.width, Abschlussarbeit.crc2.canvas.height);
        Abschlussarbeit.crc2.putImageData(imageData, 0, 0);
        for (let player of Abschlussarbeit.players) {
            if (Abschlussarbeit.stop == false) {
                player.move();
            }
            player.draw();
        }
        Abschlussarbeit.ball.move();
        Abschlussarbeit.ball.draw();
        for (let reff of Abschlussarbeit.reffs) {
            reff.draw();
        }
    }
    function shotBall(_event) {
        let rect = Abschlussarbeit.canvas.getBoundingClientRect();
        let x = _event.clientX - rect.left;
        let y = _event.clientY - rect.top;
        console.log(x, y);
        Abschlussarbeit.ball.shot(new Abschlussarbeit.Vector(x, y));
        Abschlussarbeit.stop = false;
        console.log(Abschlussarbeit.stop);
    }
    Abschlussarbeit.spieler1 = 0;
    Abschlussarbeit.spieler2 = 11;
    function nextCard(_event) {
        let elem = _event.target;
        let searchButton = String(elem.getAttribute("id"));
        if (searchButton == "next1") {
            if (Abschlussarbeit.spieler1 == 11) {
                Abschlussarbeit.spieler1 = 0;
            }
            Abschlussarbeit.players[Abschlussarbeit.spieler1].playerCard(1);
            Abschlussarbeit.spieler1++;
        }
        else {
            if (Abschlussarbeit.spieler2 == 22) {
                Abschlussarbeit.spieler2 = 11;
            }
            Abschlussarbeit.players[Abschlussarbeit.spieler2].playerCard(2);
            Abschlussarbeit.spieler2++;
        }
    }
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=main2.js.map