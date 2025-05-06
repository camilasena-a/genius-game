// 0 Verde
// 1 Vermelho
// 2 Amarelo
// 3 Azul

const pads = document.querySelectorAll(".color");
const greenEl = document.querySelector(".green");
const redEl = document.querySelector(".red");
const yellowEl = document.querySelector(".yellow");
const blueEl = document.querySelector(".blue");
const startBtn = document.querySelector(".start");
const scoreDisplay = document.querySelector(".score");
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreDisplay = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const modalContent = document.querySelector(".modal-content");

let playing = false;
let gameSequence = [];
let playerSequence = [];
let playerCanPlay = false;
let score = 0;

function disablePads() {
  pads.forEach((pad) => pad.classList.remove("selected"));
}

function colorElement(color) {
  if (color == 0) {
    return greenEl;
  } else if (color == 1) {
    return redEl;
  } else if (color == 2) {
    return yellowEl;
  } else if (color == 3) {
    return blueEl;
  }
}

function playSequence() {
  let counter = 0;
  let padOn = true;

  playerCanPlay = false;
  changePadCursor("auto");
  playerSequence = [];

  const interval = setInterval(() => {
    if (padOn) {
      if (counter === gameSequence.length) {
        clearInterval(interval);
        disablePads();
        playerCanPlay = true;
        changePadCursor("pointer");
        return;
      }
      const pad = colorElement(gameSequence[counter]);
      pad.classList.add("selected");
      counter++;
    } else {
      disablePads();
    }

    padOn = !padOn;
  }, 750);
}

function newColor() {
  const randomColor = Math.floor(Math.random() * 4);
  gameSequence.push(randomColor);
}

function startGame() {
  if (!playing) {
    newColor();
    playSequence();
    playing = true;
  }
}

function lose() {
  // Exibir o modal em vez do alerta
  finalScoreDisplay.textContent = score;
  gameOverModal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.add("show");
  }, 100);
  
  gameSequence = [];
  playerSequence = [];
  playing = false;
  
  // Não resetar o score imediatamente para mostrar no modal
  // O score será resetado ao reiniciar o jogo
}

function resetGame() {
  // Esconder o modal
  modalContent.classList.remove("show");
  setTimeout(() => {
    gameOverModal.classList.add("hidden");
    // Resetar o score após fechar o modal
    score = 0;
    displayScore();
  }, 300);
}

function changePadCursor(cursorType) {
  pads.forEach((pad) => {
    pad.style.cursor = cursorType;
  });
}

function displayScore() {
  scoreDisplay.textContent = score;
}

function padListener(e) {
  if (!playerCanPlay) return;

  e.target.classList.add("selected");
  playerSequence.push(Number(e.target.dataset.id));

  setTimeout(() => {
    e.target.classList.remove("selected");
    const currentMove = playerSequence.length - 1;
    if (playerSequence[currentMove] !== gameSequence[currentMove]) {
      playerCanPlay = false;
      disablePads();
      lose();
    } else if (currentMove === gameSequence.length - 1) {
      score++;
      displayScore();
      newColor();
      playSequence();
    }
  }, 250);
}

pads.forEach((pad) => {
  pad.addEventListener("click", padListener);
});

startBtn.addEventListener("click", startGame);
restartButton.addEventListener("click", function() {
  resetGame();
  // Iniciar um novo jogo após um breve delay
  setTimeout(startGame, 500);
});

// Fechar modal clicando no backdrop
document.querySelector(".modal-backdrop").addEventListener("click", resetGame);
