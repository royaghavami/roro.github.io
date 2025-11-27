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
  { 
    title: "Everything EveryWhere - Vaultboy", 
    file: "./assets/songs/everything-everywhere.mp3",
    cover: "./assets/images/audio1.jpeg"
  },
  { 
    title: "Blind - Alex Sampson", 
    file: "./assets/songs/blind.mp3",
    cover: "./assets/images/audio2.jpeg"
  },
];

let currentAudio = null;
let currentCard = null;

function renderSongs() {
    const container = document.getElementById("songList");
    songs.forEach(song => {
        const card = document.createElement("div");
        card.classList.add("song-card");

        const img = document.createElement("img");
        img.classList.add("song-cover");
        img.src = song.cover;
        card.appendChild(img);

        const title = document.createElement("div");
        title.classList.add("song-title");
        title.textContent = song.title;
        card.appendChild(title);

        const controls = document.createElement("div");
        controls.classList.add("song-controls");

        const icon = document.createElement("span");
        icon.classList.add("song-icon");
        icon.textContent = "▶";

        const time = document.createElement("span");
        time.classList.add("song-time");
        time.textContent = "0:00";

        controls.appendChild(icon);
        controls.appendChild(time);
        card.appendChild(controls);

        const audio = new Audio(song.file);
        const progress = document.createElement("input");
        progress.type = "range";
        progress.min = 0;
        progress.value = 0;
        progress.max = 0;
        progress.classList.add("song-progress");
        card.appendChild(progress);

        // Update time & progress
        audio.addEventListener("loadedmetadata", () => {
            progress.max = Math.floor(audio.duration);
        });

        audio.addEventListener("timeupdate", () => {
            progress.value = Math.floor(audio.currentTime);
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60).toString().padStart(2,"0");
            time.textContent = `${mins}:${secs}`;
        });

        progress.addEventListener("input", () => {
            audio.currentTime = progress.value;
        });

        icon.onclick = () => {
            if(currentAudio && currentAudio !== audio){
                currentAudio.pause();
                currentCard.querySelector(".song-icon").classList.remove("playing");
                currentCard.querySelector(".song-icon").textContent = "▶";
            }

            if(audio.paused){
                audio.play();
                icon.classList.add("playing");
                icon.textContent = "⏸";
                currentAudio = audio;
                currentCard = card;
            } else {
                audio.pause();
                icon.classList.remove("playing");
                icon.textContent = "▶";
            }
        };

        container.appendChild(card);
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


const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.innerHTML = `<img src="${img.src}" alt="Gallery Image">`;
        lightbox.classList.add('show');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
});


// Arrival countdown
const arrivalDate = new Date();
arrivalDate.setDate(arrivalDate.getDate() + 29); // 29 days from now

function updateArrival() {
    const now = new Date();
    const diff = arrivalDate - now;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    document.getElementById('arrivalCountdown').textContent =
        `Only ${days} days, ${hours}h ${minutes}m ${seconds}s until he comes back! 💕`;
}

updateArrival();
setInterval(updateArrival, 1000);
