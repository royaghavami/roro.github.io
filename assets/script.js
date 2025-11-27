// ----------------------------
// DAYS TOGETHER CALCULATION
// ----------------------------
const startDate = new Date("2025-09-14");

function updateDaysTogether() {
  const today = new Date();
  const diff = today - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("daysTogether").textContent =
    `${days} days 💕`;
}
updateDaysTogether();

const heartContainer = document.querySelector(".days-section .hearts-container");


// ----------------------------
// DARK MODE TOGGLE
// ----------------------------
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};


// ----------------------------
// CONFETTI
// ----------------------------
document.getElementById("confettiButton").onclick = () => {
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement("div");
    conf.textContent = "💖";
    conf.classList.add("heart");

    conf.style.left = Math.random() * 100 + "%";
    conf.style.top = "100vh";
    conf.style.fontSize = Math.random() * 30 + 20 + "px";

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 3000);
  }
};


// ----------------------------
// SONG LIST
// ----------------------------
const songs = [
  { title: "Everything EveryWhere - Vaultboy", file: "./assets/songs/everything-everywhere.mp3" },
  { title: "Blind - Alex Sampson", file: "./assets/songs/blind.mp3" },
];

let currentAudio = null;
let currentIcon = null;

function renderSongs() {
  const ul = document.getElementById("songList");

  songs.forEach((song) => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = song.title;

    const icon = document.createElement("span");
    icon.classList.add("song-icon");
    icon.textContent = "▶"; // play icon

    const audio = new Audio(song.file);

    icon.onclick = () => {
      // Stop previous song
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentIcon.classList.remove("playing");
        currentIcon.textContent = "▶";
      }

      if (audio.paused) {
        audio.play();
        icon.classList.add("playing");
        icon.textContent = "⏸";
        currentAudio = audio;
        currentIcon = icon;
      } else {
        audio.pause();
        icon.classList.remove("playing");
        icon.textContent = "▶";
      }
    };

    li.appendChild(title);
    li.appendChild(icon);
    ul.appendChild(li);
  });
}
renderSongs();


// ----------------------------
// FLOATING HEARTS
// ----------------------------
const container = document.querySelector(".hearts-container");

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤";

    const size = Math.random() * 20 + 15;
    heart.style.fontSize = `${size}px`;
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";

    heart.style.cursor = "pointer";
    heart.onclick = () => {
        heart.style.transform = "scale(2)";
        heart.style.transition = "0.2s";
        setTimeout(() => heart.remove(), 150);
    };

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}


setInterval(createHeart, 600);



window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loadingScreen").style.opacity = "0";
        document.getElementById("loadingScreen").style.transition = "0.6s";
        setTimeout(() => {
            document.getElementById("loadingScreen").remove();
        }, 600);
    }, 800); 
});
