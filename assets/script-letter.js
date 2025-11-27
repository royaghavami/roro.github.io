// ----------- Red Strings (Lovers’ Fate) -----------
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

        for (let x = 0; x <= canvas.width; x += 2) {
            const progress = x / canvas.width;
            const y = str.amplitude * Math.sin(str.frequency * x + time)
                    + str.amplitude * 0.5 * Math.sin(str.frequency * x * 2 + time * 2)
                    + canvas.height * progress;
            const drawX = canvas.width - x;
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

  // Random horizontal position
  heart.style.left = Math.random() * 90 + "%";
  heart.style.bottom = "-30px"; // start below viewport
  const size = 15 + Math.random() * 25;
  heart.style.fontSize = size + "px";

  heart.style.position = "absolute";
  heart.style.cursor = "pointer";
  heart.style.userSelect = "none";
  heart.style.zIndex = 10;
  heart.style.transition = "transform 0.2s, opacity 0.5s";

  heart.onclick = (e) => {
    const msg = document.createElement("div");
    msg.classList.add("heart-msg");
    msg.textContent = heartMessages[Math.floor(Math.random() * heartMessages.length)];
    msg.style.left = e.pageX + "px";
    msg.style.top = e.pageY + "px";

    msg.style.position = "absolute";
    msg.style.background = "#fff0f4";
    msg.style.border = "2px solid #ff6b81";
    msg.style.padding = "6px 10px";
    msg.style.borderRadius = "8px";
    msg.style.color = "#d83d5a";
    msg.style.fontSize = "14px";
    msg.style.opacity = 0;
    msg.style.transform = "translateY(10px)";
    msg.style.transition = "all 0.5s ease";

    document.body.appendChild(msg);

    requestAnimationFrame(() => {
      msg.style.opacity = 1;
      msg.style.transform = "translateY(-20px)";
    });

    setTimeout(() => {
      msg.style.opacity = 0;
      setTimeout(() => msg.remove(), 500);
    }, 2000);
  };

  floatingContainer.appendChild(heart);

  // Animate the heart slowly upwards
  let pos = 0;
  const speed = 0.4 + Math.random() * 0.4; // slower movement
  const anim = setInterval(() => {
    pos += speed;
    heart.style.bottom = pos + "px";
    if (pos > window.innerHeight + 50) {
      heart.remove();
      clearInterval(anim);
    }
  }, 20);
}

setInterval(createFloatingHeart, 1200); // spawn less frequently
