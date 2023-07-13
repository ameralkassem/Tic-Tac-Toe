
let startbtn = document.getElementById("start");
let resetbtn = document.getElementById("reset");

let currentPlayer = "X";
let moves = 0;
let active = false;

let player1Name = "";
let player2Name = "";
let player1Score = 0;
let player2Score = 0;

let namesEntered = false; 
let firstMove = true; 

alert("Welcome to XO game! ( 2 players game ) \nDeveloped by ~ Amer ~");

startbtn.addEventListener("click", function(){
    if (!namesEntered) {

        player1Name = window.prompt("Player 1 name:");
        player2Name = window.prompt("Player 2 name:");
        if (player1Name === ""){ 
            player1Name = "Player 1"
        } 
        if (player2Name === ""){ 
            player2Name = "Player 2"
        } 

        namesEntered = true; 
    }

    resetGame();
    startGame();
});

resetbtn.addEventListener("click", function(){
    resetGame();

    player1Score = 0;
    player2Score = 0;

    document.querySelector(".xscore").innerText = player1Score;
    document.querySelector(".oscore").innerText = player2Score;
});

function startGame() {
    active = true;
    moves = 0;
    currentPlayer = firstMove ? "O" : "X";
    document.getElementById("xname").innerText = player1Name;
    document.getElementById("oname").innerText = player2Name;
    document.getElementById("tname").innerText = currentPlayer === "X" ? player1Name + "'s Turn" : player2Name + "'s Turn";

    
    let boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", handleBoxClick);
    }
}

function resetGame() {
    let boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "";
    }

    gameActive = false;
    firstMove = !firstMove; 
    startGame();
}

function handleBoxClick(event) {
    if (!active) return;

    let selectedBox = event.target;

    if (selectedBox.textContent === "") {
        selectedBox.textContent = currentPlayer;
        moves++;

        if (checkWin()) {
            let winnerName = currentPlayer === "X" ? player1Name : player2Name;
            document.getElementById("tname").innerText = winnerName + " wins!";
            updateScore(winnerName);
            active = false;
            return;
        } else if (moves === 9) {
            document.getElementById("tname").innerText = "It's a tie!";
            active = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        let currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
        document.getElementById("tname").innerText = currentPlayerName + "'s Turn";
    }
}

function checkWin() {
    let boxes = document.querySelectorAll(".box");
    let winningline = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningline.length; i++) {
        let [a, b, c] = winningline[i];
        if (boxes[a].textContent !== "" && boxes[a].textContent === boxes[b].textContent && boxes[b].textContent === boxes[c].textContent) {
            return true;
        }
    }

    return false;
}

function updateScore(playerName) {
    if (playerName === player1Name) {
        player1Score++;
        document.querySelector(".xscore").innerText = player1Score;
    } else if (playerName === player2Name) {
        player2Score++;
        document.querySelector(".oscore").innerText = player2Score;
    }
}
