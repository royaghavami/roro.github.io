document.addEventListener("DOMContentLoaded", () => {
  const songLineContainer = document.getElementById("songLine");
  if (!songLineContainer) return;

  const songs = [
    { id: 3, title: "Mausoleum - RAFFERTY", file: "./assets/songs/everything-everywhere.mp3", cover: "./assets/images/audio3.jpeg", sender: "Roya", date: "2025-01-14" },
    { id: 1, title: "Everything EveryWhere – Vaultboy", file: "./assets/songs/everything-everywhere.mp3", cover: "./assets/images/audio1.jpeg", sender: "Roya", date: "2025-01-14" },
    { id: 2, title: "Blind – Alex Sampson", file: "./assets/songs/blind.mp3", cover: "./assets/images/audio2.jpeg", sender: "Roya", date: "2025-02-02" },
    { id: 4, title: "Mi amor - Arta and Saaren", file: "./assets/songs/blind.mp3", cover: "./assets/images/audio4.jpeg", sender: "Roozbeh", date: "2025-02-02" },
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
