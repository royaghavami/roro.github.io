document.addEventListener("DOMContentLoaded", () => {
  const songLineContainer = document.getElementById("songLine");
  if (!songLineContainer) return;

  const songs = [
    { id: 1, title: "Mausoleum - RAFFERTY", file: "./assets/songs/01 Rafferty - Mausoleum.mp3", cover: "./assets/images/audio3.jpeg", sender: "Roya", date: "2025-09-07" },

    { id: 2, title: "Everything EveryWhere – Vaultboy", file: "./assets/songs/everything-everywhere.mp3", cover: "./assets/images/audio1.jpeg", sender: "Roya", date: "2025-09-14" },
    { id: 3, title: "Blind – Alex Sampson", file: "./assets/songs/blind.mp3", cover: "./assets/images/audio2.jpeg", sender: "Roya", date: "2025-09-14" },

    { id: 4, title: "She's Got That - Chase McDaniel", file: "./assets/songs/she got that.mp3", cover: "./assets/images/audio6.jpg", sender: "Roya", date: "2025-09-24" },
    { id: 5, title: "Project - Chase McDaniel", file: "./assets/songs/project.mp3", cover: "./assets/images/audio10.jpeg", sender: "Roya", date: "2025-09-24" },

    { id: 6, title: "Mi amor - Arta and Saaren", file: "./assets/songs/Arta Saaren Mi Amor.mp3", cover: "./assets/images/audio4.jpeg", sender: "Roozbeh", date: "2025-09-26" },
    { id: 7, title: "Bezan Baroon - Dekamond", file: "./assets/songs/Dekamond - Bezan Baroon.mp3", cover: "./assets/images/audio9.jpeg", sender: "Roya", date: "2025-09-26" },

    { id: 8, title: "Die For You - Starset", file: "./assets/songs/04 Starset - Die For You.mp3", cover: "./assets/images/audio5.jpg", sender: "Roozbeh", date: "2025-10-01" },

    { id: 9, title: "Lonely City - Mokita", file: "./assets/songs/Mokita - Lonely City.mp3", cover: "./assets/images/audio7.jpeg", sender: "Roozbeh", date: "2025-10-16" },

    { id: 10, title: "Strangers - Roosevelt", file: "./assets/songs/Roosevelt - Strangers.mp3", cover: "./assets/images/audio8.jpeg", sender: "Roozbeh", date: "2025-11-14" },
  ];

  let currentAudio = null;
  let currentEntry = null;

  songLineContainer.innerHTML = "";

  songs.forEach(song => {
    const songEntry = document.createElement("div");
    songEntry.classList.add("song-entry", song.sender === "Roya" ? "right" : "left");
    songEntry.dataset.songId = song.id;

    const card = document.createElement("div");
    card.classList.add("songs-card");

    // Cover + play
    const coverWrapper = document.createElement("div");
    coverWrapper.classList.add("cover-wrapper");

    const img = document.createElement("img");
    img.classList.add("song-cover");
    img.src = song.cover;
    coverWrapper.appendChild(img);

    const playBtn = document.createElement("span");
    playBtn.classList.add("cover-play");
    playBtn.textContent = "▶";
    coverWrapper.appendChild(playBtn);

    // Right column (info)
    const infoWrapper = document.createElement("div");
    infoWrapper.classList.add("song-info");

    // Song title
    const songTitle = document.createElement("p");
    songTitle.classList.add("songs-title");
    songTitle.textContent = song.title;
    infoWrapper.appendChild(songTitle);

    // Sender
    const title = document.createElement("h4");
    title.classList.add("sender-name");
    title.textContent = `🎵 ${song.sender} Sent`;
    infoWrapper.appendChild(title);

    // Progress
    const progress = document.createElement("input");
    progress.type = "range";
    progress.min = 0;
    progress.value = 0;
    progress.max = 0;
    progress.classList.add("song-progress");
    infoWrapper.appendChild(progress);

    card.appendChild(infoWrapper);
    card.appendChild(coverWrapper);


    // Audio
    const audio = new Audio(song.file);

    audio.addEventListener("loadedmetadata", () => progress.max = Math.floor(audio.duration));
    audio.addEventListener("timeupdate", () => progress.value = Math.floor(audio.currentTime));
    progress.addEventListener("input", () => audio.currentTime = progress.value);

    // Play/pause
    playBtn.addEventListener("click", () => {
      if(currentAudio && currentAudio !== audio){
        currentAudio.pause();
        if(currentEntry){
          const prevBtn = currentEntry.querySelector(".cover-play");
          if(prevBtn){ prevBtn.classList.remove("playing"); prevBtn.textContent="▶"; }
        }
      }

      if(audio.paused){
        audio.play(); playBtn.classList.add("playing"); playBtn.textContent="⏸";
        currentAudio = audio; currentEntry = songEntry;
      } else {
        audio.pause(); playBtn.classList.remove("playing"); playBtn.textContent="▶";
        currentAudio = null; currentEntry = null;
      }
    });

    songEntry.appendChild(card);
    songLineContainer.appendChild(songEntry);
  });
});
