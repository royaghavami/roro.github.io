const aimArea = document.getElementById("aim-area");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

let score = 0;
let time = 30; // countdown from 30 seconds
let timerInterval = null;
let targetInterval = 1500; // initial target move interval in ms
let moveTimer = null;

// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        timerEl.textContent = time;
        if (time <= 0) endGame();
    }, 1000);
}

// Create a target at random position
function createTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.innerText = "🎯";

    function setRandomPosition() {
        const x = Math.random() * (aimArea.clientWidth - target.offsetWidth);
        const y = Math.random() * (aimArea.clientHeight - target.offsetHeight);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    setRandomPosition();
    aimArea.appendChild(target);

    // Click event
    target.addEventListener("click", () => {
        score += 5;
        scoreEl.textContent = score;
        aimArea.removeChild(target);

        // Increase difficulty
        if (targetInterval > 600) targetInterval -= 50;

        createTarget(); // spawn next target
    });

    // Move target every targetInterval ms if not clicked
    moveTimer = setInterval(() => {
        if (aimArea.contains(target)) setRandomPosition();
        else clearInterval(moveTimer);
    }, targetInterval);
}

// End game
function endGame() {
    clearInterval(timerInterval);
    clearInterval(moveTimer);
    aimArea.innerHTML = "";
    alert(`🎉 Time's up!\n⭐ Final Score: ${score}`);
    // Optionally restart game automatically
    // startGame();
}

// Initialize game
function startGame() {
    score = 0;
    time = 30;
    targetInterval = 1500;
    scoreEl.textContent = score;
    timerEl.textContent = time;

    clearInterval(timerInterval);
    clearInterval(moveTimer);
    aimArea.innerHTML = "";

    startTimer();
    createTarget();
}

startGame();
