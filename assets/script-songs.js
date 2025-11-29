// -------------------------------------------
// SONG DATA
// -------------------------------------------
const songs = [
  { 
    title: "Everything EveryWhere – Vaultboy",
    file: "./assets/songs/everything-everywhere.mp3",
    cover: "./assets/images/audio1.jpeg",
    sender: "Roozbeh",
    date: "2025-01-14"
  },
  { 
    title: "Blind – Alex Sampson",
    file: "./assets/songs/blind.mp3",
    cover: "./assets/images/audio2.jpeg",
    sender: "Roya",
    date: "2025-02-02"
  },
];

// -------------------------------------------
// VARIABLES
// -------------------------------------------
let currentAudio = null;
let currentCard = null;

// -------------------------------------------
// RENDER TIMELINE
// -------------------------------------------
const timelineContainer = document.getElementById("timeline"); // fixed


// songs.forEach((song, index) => {
//   // Timeline item
//   const timelineItem = document.createElement("div");
//   timelineItem.classList.add("timeline-item");
//   timelineItem.classList.add(song.sender === "Roya" ? "right" : "left");

//   const content = document.createElement("div");
//   content.classList.add("timeline-content");

//   const title = document.createElement("h4");
//   title.textContent = `🎵 ${song.sender} Sent`;
//   content.appendChild(title);

//   const songTitle = document.createElement("p");
//   songTitle.textContent = song.title;
//   content.appendChild(songTitle);

//   const date = document.createElement("span");
//   date.classList.add("timeline-date");
//   date.textContent = song.date;
//   content.appendChild(date);

//   timelineItem.appendChild(content);
//   timelineContainer.appendChild(timelineItem);

//   // Add vertical line (hr) between timeline items except after the last one
//   if (index < songs.length - 1) {
//     const hr = document.createElement("hr");
//     hr.classList.add("timeline-hr");
//     timelineContainer.appendChild(hr);
//   }
// });

// -------------------------------------------
// RENDER SONG CARDS (PLAYER)
// -------------------------------------------
const songListContainer = document.getElementById("songList");

songs.forEach(song => {
  const card = document.createElement("div");
  card.classList.add("song-card");

  const img = document.createElement("img");
  img.classList.add("song-cover");
  img.src = song.cover;
  card.appendChild(img);

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("song-title");
  cardTitle.textContent = song.title;
  card.appendChild(cardTitle);

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

  songListContainer.appendChild(card);
});
