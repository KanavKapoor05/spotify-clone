const playBtn = document.getElementById("play");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? "⏸️" : "▶️";
  // Add audio play/pause logic here
});
