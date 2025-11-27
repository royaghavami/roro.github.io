// ----------------------------
// DAYS TOGETHER CALCULATION
// ----------------------------

// Set to your real first date
const startDate = new Date("2025-09-14");

function updateDaysTogether() {
  const today = new Date();
  const diff = today - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("daysTogether").textContent =
    `${days} days 💕`;
}
updateDaysTogether();


// ----------------------------
// SONG LIST
// ----------------------------
// Songs list automatically from folder
const songs = [
  { title: "Everything EveryWhere - Vaultboy", file: "./assets/songs/everything-everywhere.mp3" },
  { title: "Second Favorite", file: "assets/songs/song2.mp3" },
];

function renderSongs() {
  const ul = document.getElementById("songList");

  songs.forEach((song, index) => {
    const li = document.createElement("li");

    // play button
    const btn = document.createElement("div");
    btn.classList.add("song-play-button");
    btn.innerHTML = "❤";

    const audio = new Audio(song.file);

    btn.onclick = () => {
      if (audio.paused) {
        audio.play();
        btn.classList.add("playing");
      } else {
        audio.pause();
        btn.classList.remove("playing");
      }
    };

    li.appendChild(btn);

    const text = document.createElement("span");
    text.textContent = song.title;
    li.appendChild(text);

    ul.appendChild(li);
  });
}
renderSongs();


const heartMessages = [
  "I love you ❤️",
  "You make my world brighter ✨",
  "You are my favorite person 💕",
  "Every moment with you feels special 🌸",
  "I’m so happy I met you 💗"
];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("heart")) {
    const msg = document.createElement("div");
    msg.classList.add("heart-message");
    msg.textContent = heartMessages[Math.floor(Math.random() * heartMessages.length)];

    msg.style.left = e.pageX + "px";
    msg.style.top = e.pageY + "px";

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 2000);
  }
});


// ----------------------------
// FLOATING HEARTS
// ----------------------------
const container = document.querySelector("#daysSection .hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤";

  const size = Math.random() * 20 + 10;
  heart.style.fontSize = `${size}px`;

  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = 10 + Math.random() * 3 + "s";

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 600);
