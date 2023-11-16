
// e l e m e n t   f r å n   s i d a n

const playerHandContainer = document.getElementById("playerHand_container");
const computerHandContainer = document.getElementById("computerHand_container");

const playerScoreContainer = document.getElementById("playerScoreContainer");
const computerScoreContainer = document.getElementById("computerScoreContainer");

const messageBox = document.getElementById("instructions");

const stoneMoveBtn = document.getElementById("stone_btn");
const scissorMoveBtn = document.getElementById("scissor_btn");
const bagMoveBtn = document.getElementById("bag_btn");

const playBtn = document.getElementById("play_btn");
console.log(playBtn);

const screamWall = document.getElementById("coutn-down_div");
const coutnDownDcream_p = document.getElementById("coutn-down_scream");

/* ------------------------------------------------*/
/* ------------------------------------------------*/
/* ------------------------------------------------*/

//Ger välkomstmeddelande med instruktioner
messageBox.innerHTML = `
<h2>Instruktioner</h2>
<p>Välkommen till en spännande omgång STEN SAX PÅSE där du spelar mot vår superdator. Vinner gör den som först når 5 poäng.</p>
<p>Välj ditt drag nedan och tryck på spela!</p>`;

/* ------------------------------------------------*/
/* ------------------------------------------------*/
/* ------------------------------------------------*/


// S P E L A R E N S   D A R G:

//håller info om spelarens val av move
let selectedMove;

//lyssnar efter och lagrar användaresn val av move
//Skriver en bit htmlkod in i spelarens planhalva som visar tillhörande bild
stoneMoveBtn.addEventListener("click", function () {
    selectedMove = "sten";
    playerHandContainer.innerHTML = `<img src="images/rock-left.png" alt="Du valde sten">`;
    //rensar datorns val:
    computerHandContainer.innerHTML = "";
});
scissorMoveBtn.addEventListener("click", function () {
    selectedMove = "sax";
    playerHandContainer.innerHTML = `<img src="images/scissor-left.png" alt="Du valde sax">`;
    computerHandContainer.innerHTML = "";
});
bagMoveBtn.addEventListener("click", function () {
    selectedMove = "påse";
    playerHandContainer.innerHTML = `<img src="images/bag-left.png" alt="Du valde påse">`;
    computerHandContainer.innerHTML = "";
});

/* ------------------------------------------------*/
/* ------------------------------------------------*/
/* ------------------------------------------------*/


// S P E L M O T O R
// N Ä R   S P E L A R E N   T R Y C K E R   P Å   K N A P P E N

//håller info om datorns drag
let computerMove;
//spelarens selected move deklareras längre upp

let playerScore = 0;
let computerScore = 0;



playBtn.addEventListener("click", function () {
    console.log("klickad")

    //Om spelaren har markerat sitt drag så körs programmet annars får den en uppmaning!
    if (selectedMove) {

        //räkna ner med spelaren STEN SAX PÅSE!
        screamCountDown();

        //rensar meddelanderutan
        messageBox.innerHTML = "";

        //genera datorns drag
        computerMove = generateComputerMove();
        console.log(computerMove);

        //Rendera Datorns drag till planhalva
        renderComputerMove();

        //jämför dragen
        //returnerar "player" eller "computer" beroende på vem som vann rundan, eller "tie" om oavgjort
        const roundWinner = compareMove();
        console.log(`roundWinner ${roundWinner}`);
        console.log(`poäng spelare: ${playerScore} poäng dator: ${computerScore}`)


        //rendera ut poängen:
        playerScoreContainer.innerHTML = "<p>" + playerScore + "</p>";
        computerScoreContainer.innerHTML = "<p>" + computerScore + "</p>";

        //Rendera info om vem som vann rundan:

        // skapar strings beroende på utgång
        let roundWinner_Headding;
        let roundWinner_P;
        switch (roundWinner) {
            case 'player':
                roundWinner_Headding = "Du tog datorn!";
                roundWinner_P = `Du spelade ${selectedMove} mot datorns ${computerMove}.`
                break;
            case 'computer':
                roundWinner_Headding = "Datorn tog dig!";
                roundWinner_P = `Datorns ${computerMove} var starkare än din ${selectedMove}.`
                break;

            case 'tie':
                roundWinner_Headding = "Jämnt lopp!";
                roundWinner_P = `Både du och datorn spelade ${computerMove}.`
                break;
        }
        //renderar ut strings i messageboxen:
        messageBox.innerHTML = `<h3>${roundWinner_Headding}</h3>
        <p>${roundWinner_P}</p>
        <br>
        <p>Välj ditt nästa drag!</p>`



        //när någon når vinnande Poäng
        if (playerScore >= 5 || computerScore >= 5) {

            //WinnermessageClass används för att märka upp slutmeddelande med rätt klasss så de kan stylas rätt.
            let WinnermessageClass

            if (playerScore > computerScore) {
                WinnermessageClass = "playeriswinner";
                //skriver meddelande
                messageBox.innerHTML = `
                    <p>Du spelade ${selectedMove}. Datorn spelade ${computerMove}.</p>
                    <br>
                    <div class="${WinnermessageClass}">
                        <h3> DU VANN!</h3>
                        <p>Grattis! Du slog vår Superdator!</p>
                    </div> 
                    <button class="reload">SPELA IGEN!</button>`
            } else {
                WinnermessageClass = "computeriswinner";
                //skriver meddelande
                messageBox.innerHTML = `
                 <p>Du spelade ${selectedMove}. Datorn spelade ${computerMove}.</p>
                 <br>
                    <div class="${WinnermessageClass}">
                        <h3> DU FÖRLORADE !</h3>
                        <p>Sorry, vår superdator var visst för listig för dig!</p>
                    </div>
                    <button class="reload">SPELA IGEN!</button>`
            }

            //funktion för att ladda om sidan vid klick på den nya knappen
            document.querySelector(".reload").addEventListener("click", function () {
                location.reload();
            });

            //Döljd playbtn och de olika olika altenativen till drag
            playBtn.classList.add("hidden");
            stoneMoveBtn.style = "display: none;";
            scissorMoveBtn.style = "display: none;";
            bagMoveBtn.style = "display: none;";


        }

    } else {

        // skriver varning i domen och tar bort den efter 3000 milisek
        messageBox.appendChild(document.createElement("p")).textContent = "Välj ditt drag!";
        messageBox.lastChild.classList = "temp"
        messageBox.lastChild.style = "color: red;";

        setTimeout(function () {
            const tempAlert = messageBox.lastChild;
            tempAlert.remove();
        }, 2000);

    }






})


/* ------------------------------------------------*/
// F U N K T O I N E R :

//ScreaCoutnDown Funktonen visar en wall och ränar ner med spelaren STEN SAX PÅSE!
function screamCountDown() {

    screamWall.classList.toggle("hidden");

    setTimeout(function () {
        coutnDownDcream_p.textContent = "STEN !"

        setTimeout(function () {
            coutnDownDcream_p.textContent = "SAX !"

            setTimeout(function () {
                coutnDownDcream_p.textContent = "PÅSE !"

                setTimeout(function () {
                    screamWall.classList.toggle("hidden");
                    coutnDownDcream_p.textContent = "";
                }, 800)

            }, 800);

        }, 800);

    }, 0);

}

//genererar och returerar en string som motsvarar datorns drag
function generateComputerMove() {
    //generera random siffra mellan från 0 till 2
    let move = Math.floor(Math.random() * 3);
    console.log(move);

    switch (move) {
        case 0:
            move = "sten";
            break;
        case 1:
            move = "sax";
            break;
        case 2:
            move = "påse";
            break;
    }

    return move;
}

//renderar bild av datorns drag till dess planhalva
function renderComputerMove() {
    switch (computerMove) {
        case "sten": computerHandContainer.innerHTML = '<img src="images/rock-right.png">';
            break;
        case "sax": computerHandContainer.innerHTML = '<img src="images/scissor-right.png">';
            break;
        case "påse": computerHandContainer.innerHTML = '<img src="images/bag-right.png">';
            break;
    }
};

//jämför dragen
//returnerar "player" eller "computer" beroende på vem som vann rundan, eller "tie" om oavgjort
function compareMove() {
    if (selectedMove === computerMove) {
        console.log("Det är oavgjort!");
        return "tie";
    } else if (
        (selectedMove === "sten" && computerMove === "sax") || (selectedMove === "sax" && computerMove === "påse") || (selectedMove === "påse" && computerMove === "sten")
    ) {
        console.log("Spelaren vinner!");
        playerScore++;
        return "player"
    } else {
        console.log("Datorn vinner!");
        computerScore++;
        return "computer"
    }
};