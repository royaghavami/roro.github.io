const board = document.getElementById("memory-board");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

const symbols = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍑"];
let cards = [...symbols, ...symbols]; // pairs
let flipped = [];
let matched = 0;
let score = 0;
let time = 0;
let timerInterval = null;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = time;
  }, 1000);
}

function createBoard() {
  board.innerHTML = "";
  shuffle(cards);
  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerText = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped") || this.classList.contains("matched")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.symbol;
  flipped.push(this);

  if (flipped.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matched += 2;
    score += 10;
  } else {
    score -= 2;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "?";
      card2.innerText = "?";
    }, 800);
  }
  scoreEl.textContent = score;
  flipped = [];

  if (matched === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert(`🎉 You Won!\n⏱ Time: ${time}s\n⭐ Score: ${score}`);
    }, 400);
  }
}

// Initialize game
resetGame();
function resetGame() {
  score = 0;
  time = 0;
  matched = 0;
  scoreEl.textContent = score;
  timerEl.textContent = time;
  clearInterval(timerInterval);
  createBoard();
  startTimer();
}
