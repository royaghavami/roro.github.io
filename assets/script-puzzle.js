const upload = document.getElementById("imageUpload");
const board = document.getElementById("puzzle-board");
const piecesContainer = document.getElementById("pieces-container");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const previewBtn = document.getElementById("previewBtn");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");

/* ✅ SOUND EFFECTS */
const correctSound = new Audio("./assets/songs/correct.mp3");
const wrongSound = new Audio("./assets/songs/wrong.mp3");
const winSound = new Audio("./assets/songs/win.mp3");

const rows = 4;
const cols = 3;

let draggedPiece = null;
let score = 0;
let time = 0;
let timerInterval = null;
let currentImageSrc = "";

upload.addEventListener("change", handlePuzzleImageUpload);
previewBtn.addEventListener("click", showPuzzlePreview);

/* ✅ IMAGE UPLOAD */
function handlePuzzleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  currentImageSrc = img.src;

  img.onload = () => {
    resetPuzzle();
    createPuzzle(img);
    startPuzzleTimer();
  };
}

/* ✅ RESET PUZZLE */
function resetPuzzle() {
  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timerEl.textContent = time;
  clearInterval(timerInterval);
  previewContainer.style.display = "none";
}

/* ✅ PUZZLE TIMER */
function startPuzzleTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = time;
  }, 1000);
}

/* ✅ CREATE PUZZLE */
function createPuzzle(img) {
  board.innerHTML = "";
  piecesContainer.innerHTML = "";

  let pieces = [];
  let index = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.index = index;
      board.appendChild(slot);

      slot.addEventListener("dragover", e => e.preventDefault());
      slot.addEventListener("drop", dropPuzzlePiece);

      const piece = document.createElement("div");
      piece.classList.add("piece");
      piece.draggable = true;
      piece.dataset.index = index;

      piece.style.backgroundImage = `url(${img.src})`;
      piece.style.backgroundPosition = `-${x * 120}px -${y * 120}px`;

      piece.addEventListener("dragstart", () => draggedPiece = piece);

      piece.addEventListener("dblclick", () => {
        piecesContainer.appendChild(piece);
      });

      pieces.push(piece);
      index++;
    }
  }

  shufflePuzzle(pieces);
  pieces.forEach(p => piecesContainer.appendChild(p));
}

/* ✅ DROP */
function dropPuzzlePiece() {
  if (!draggedPiece) return;

  if (this.children.length === 0) {
    this.appendChild(draggedPiece);

    draggedPiece.classList.add("snap");
    setTimeout(() => draggedPiece.classList.remove("snap"), 200);

    if (this.dataset.index === draggedPiece.dataset.index) {
      score += 10;
      correctSound.play();
    } else {
      score -= 3;
      wrongSound.play();
    }

    scoreEl.textContent = score;
  }

  checkPuzzleWin();
}

/* ✅ WIN CHECK */
function checkPuzzleWin() {
  const slots = document.querySelectorAll(".slot");
  let win = true;

  slots.forEach(slot => {
    if (!slot.firstChild || slot.dataset.index !== slot.firstChild.dataset.index) {
      win = false;
    }
  });

  if (win) {
    clearInterval(timerInterval);
    winSound.play();
    setTimeout(() => {
      alert(`🎉 Puzzle Completed!\n⏱ Time: ${time}s\n⭐ Score: ${score}`);
    }, 300);
  }
}

/* ✅ PREVIEW WITH SCORE PENALTY */
function showPuzzlePreview() {
  if (!currentImageSrc) return;

  score -= 5;
  scoreEl.textContent = score;

  previewImage.src = currentImageSrc;
  previewContainer.style.display = "block";

  setTimeout(() => {
    previewContainer.style.display = "none";
  }, 2000);
}

/* ✅ SHUFFLE */
function shufflePuzzle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
