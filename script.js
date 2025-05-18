const audio = document.getElementById('audio-player');
  const progress = document.getElementById('progress');
  const currentSongName = document.getElementById('current-song-name');
  const playButtons = document.querySelectorAll('.song button');
  const songs = document.querySelectorAll('.song');
  const mainPlay = document.getElementById('main-play');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  let currentIndex = 0;

  const updateProgress = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  };

  const setSong = (index) => {
    const song = songs[index];
    const file = song.getAttribute('data-file');
    const name = song.getAttribute('data-name');
    audio.src = file;
    currentSongName.textContent = name;
    audio.play();
    mainPlay.textContent = '⏸️';
    currentIndex = index;
  };

  playButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (currentIndex === index && !audio.paused) {
        audio.pause();
        mainPlay.textContent = '▶️';
        btn.textContent = '▶️';
      } else {
        setSong(index);
        playButtons.forEach(b => b.textContent = '▶️');
        btn.textContent = '⏸️';
      }
    });
  });

  mainPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      mainPlay.textContent = '⏸️';
    } else {
      audio.pause();
      mainPlay.textContent = '▶️';
    }
  });

  prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    setSong(currentIndex);
  });

  next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    setSong(currentIndex);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  audio.addEventListener('timeupdate', updateProgress);
