// -------------------------------------------
// MOVIE DATA
// -------------------------------------------
const movies = [
    {
    title: "The Promised Neverland - Season 1",
    image: "./assets/images/movie3.jpg",
    review: "Right off the bat, the overly cheerful and colorful energy of the show gives off an eerie feeling. If you have watched enough anime, you will know that it’s never a good sign when every one is giggling and laughing overtime. Lo and behold… wait no we are not gonna spoil it, it is definitely worth the watch, the first season at the very least. As the second season diverts heavily from the original source material. The cinematography and shot composition, as weird as it is saying that about an anime, is also a highlight of the show. Despite being an animated show, the shot composition of each scene is done in a way that a real scene in a live action movie would be directed. The story pulls you in and keeps you on your toes, wondering, guessing, and theorizing how it would eventually unfold. It is worth watching for anime fans, and anyone who enjoys mystery-based story telling.",
    suggestedBy: "Roya",
    rating: 5,
    date: "2024-09-26"
  },
  {
    title: "Pantheon - Season 1",
    image: "./assets/images/movie1.jpeg",
    review: "A very strong start to the series. A well-paced story, as well as an original and intriguing idea. A sci-fi that sits very close to the real world. The main idea behind the plot alone can pull you in and keep you engaged throughout the entire first season. Enough time is spent on each main character to let you become familiar with them. This is due to the pace of the story, where things are neither rushed nor slowed. Honestly, we are surprised that more people are not talking about this show. A lack of promotional content might be the reason, since we don’t remember seeing it anywhere either on YouTube or other platforms prior to watching it. The first season is heavily underrated, we definitely think it is worth watching for anyone who is into sci-fi movies. Do not let the simple art style and the animated medium of the show trick you into thinking this is anything below an adult and surprisingly thrilling story. However, we have some mixed feelings about the second season, which we will discuss in its relevant entry on this blog.",
    suggestedBy: "Roozbeh",
    rating: 5,
    date: "2025-11-15"
  },
  {
    title: "Together",
    image: "./assets/images/movie2.webp",
    review: "Albeit the main idea of the movie is entertaining, but I would not consider it scary. There are moments where you might feel anxious, but it’s not due to being scared, but rather the anticipation of what, for the sake of not spoiling things, ‘body horror thing’ you will witness next. There are unique aspects of body horror that will tickle your brain, but after a certain point the movie relies a bit too much on your suspension of disbelief as people start.",
    suggestedBy: "Roya",
    rating: 3,
    date: "2024-11-30"
  }
];

// -------------------------------------------
// ELEMENTS
// -------------------------------------------
const grid = document.getElementById("movieGrid");
const modal = document.getElementById("movieModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalReview = document.getElementById("modalReview");
const modalMeta = document.getElementById("modalMeta");
const closeModal = document.getElementById("closeModal");

// -------------------------------------------
// RENDER MOVIES
// -------------------------------------------
movies.forEach(movie => {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  const img = document.createElement("img");
  img.src = movie.image;

  const title = document.createElement("h4");
  title.textContent = movie.title;

  const meta = document.createElement("div");
  meta.className = "movie-meta";
  meta.innerHTML = `
    <span>
      Suggested by:
      <span class="badge ${movie.suggestedBy.toLowerCase()}">
        ${movie.suggestedBy}
      </span>
    </span>

    <span class="rating">
      ${"❤️".repeat(movie.rating)}
    </span>
  `;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(meta);

  card.onclick = () => {
    modal.classList.add("active");
    modalImg.src = movie.image;
    modalTitle.textContent = movie.title;
    modalReview.textContent = movie.review;

    modalMeta.innerHTML = `
      <p class="watch-date">
        📅 Watched on <strong>${movie.date}</strong>
      </p>
      <div class="extra-movie-info">
        <p>
            <strong>Suggested by:</strong>
            <span class="badge ${movie.suggestedBy.toLowerCase()}">
            ${movie.suggestedBy}
            </span>
        </p>

        <p><strong>Rating:</strong> ${"❤️".repeat(movie.rating)}</p>
      </div>
    `;
  };

  grid.appendChild(card);
});

// -------------------------------------------
// CLOSE MODAL
// -------------------------------------------
closeModal.onclick = () => modal.classList.remove("active");
modal.onclick = e => {
  if (e.target === modal) modal.classList.remove("active");
};
