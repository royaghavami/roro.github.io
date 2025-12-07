const aimArea = document.getElementById("aim-area");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

let score = 0;
let time = 30;
let timerInterval = null;
let targetInterval = 1500;
let moveTimer = null;

function randomColor() {
    const colors = ["#ff6b81", "#ff9aa2", "#ffb3c1", "#ff4d6d", "#ff3a58"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        timerEl.textContent = time;
        if(time<=0) endGame();
    }, 1000);
}

function createTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.innerText = "🐦"; // Bird emoji

    function setRandomPosition() {
        const x = Math.random() * (aimArea.clientWidth - target.offsetWidth);
        const y = Math.random() * (aimArea.clientHeight - target.offsetHeight);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    setRandomPosition();
    aimArea.appendChild(target);

    target.addEventListener("click", () => {
        score += 5;
        scoreEl.textContent = score;

        target.style.animation = "fadeOut 0.3s forwards";
        setTimeout(() => aimArea.removeChild(target), 300);

        if(targetInterval > 600) targetInterval -= 50;
        createTarget();
    });

    moveTimer = setInterval(() => {
        if(aimArea.contains(target)) setRandomPosition();
        else clearInterval(moveTimer);
    }, targetInterval);
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(moveTimer);
    aimArea.innerHTML = "";
    alert(`🎉 Time's up!\n⭐ Final Score: ${score}`);
}

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
