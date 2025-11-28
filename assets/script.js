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
const arrivalDate = new Date(2025, 11, 27, 0, 0, 0);

function updateArrival() {
    const now = new Date();
    const diff = arrivalDate - now;

    if (diff <= 0) {
        document.getElementById('arrivalCountdown').textContent =
            "He's already hereeee!!! ❤️🥰";
        return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    document.getElementById('arrivalCountdown').textContent =
        `Only ${days} days, ${hours}h ${minutes}m ${seconds}s until he comes back! 💕`;
}

updateArrival();
setInterval(updateArrival, 1000);


// ------------------------
// Floating Hearts with Messages
// ------------------------
const heartMessages = [
  "I love you ❤️",
  "You make my world brighter ✨",
  "You are my favorite person 💕",
  "Every moment with you feels special 🌸",
  "I’m so happy I met you 💗"
];

const floatingContainer = document.getElementById("floatingHeartsContainer");

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.textContent = "❤";

  // Random position
  heart.style.left = Math.random() * 100 + "%";
  heart.style.top = Math.random() * 100 + "%";
  heart.style.fontSize = 15 + Math.random() * 25 + "px";

  heart.onclick = (e) => {
    const msg = document.createElement("div");
    msg.classList.add("heart-msg");
    msg.textContent = heartMessages[Math.floor(Math.random() * heartMessages.length)];
    msg.style.left = e.pageX + "px";
    msg.style.top = e.pageY + "px";

    document.body.appendChild(msg);

    requestAnimationFrame(() => {
      msg.style.opacity = 1;
      msg.style.transform = "translateY(-30px)";
    });

    setTimeout(() => {
      msg.style.opacity = 0;
      setTimeout(() => msg.remove(), 300);
    }, 2000);
  };

  floatingContainer.appendChild(heart);

  // Remove heart after some time
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createFloatingHeart, 800);

// ------------------------
// Multiple Red Strings Animation
// ------------------------
const canvas = document.getElementById("redStringCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;

const strings = [
    { color: "#ff1a3c", amplitude: 20, frequency: 0.01, speed: 0.02 },
    { color: "#ff4d66", amplitude: 15, frequency: 0.015, speed: 0.025 },
    { color: "#ff7f99", amplitude: 25, frequency: 0.008, speed: 0.018 }
];

function drawRedStrings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strings.forEach(str => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = str.color;

        const startX = canvas.width;
        const startY = 0;
        const endX = 0;
        const endY = canvas.height;

        for (let x = 0; x <= canvas.width; x += 2) {
            const progress = x / canvas.width;
            const y = startY + (endY - startY) * progress
                    + str.amplitude * Math.sin(str.frequency * x + time)
                    + str.amplitude * 0.5 * Math.sin(str.frequency * x * 2 + time * 2);
            const drawX = startX - x;
            ctx.lineTo(drawX, y);
        }

        ctx.stroke();
    });

    time += 0.02;
    requestAnimationFrame(drawRedStrings);
}

drawRedStrings();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});