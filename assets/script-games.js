// Navigate to game page when card clicked
document.querySelectorAll(".game-card").forEach(card => {
  const link = card.getAttribute("data-link");
  if (link) {
    card.addEventListener("click", () => {
      window.location.href = link;
    });
  }
});
