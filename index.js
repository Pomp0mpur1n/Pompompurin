const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();
let nextSong = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Telepatia but Lofi',
        cover: 'assets/1.gif',
        artist: 'AFK',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Letting You Go',
        cover: 'assets/2.gif',
        artist: 'AFK',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Handle You With Care',
        cover: 'assets/3.gif',
        artist: 'AFK',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.pause();

    music.src = song.path;
    music.load();

    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    const nextIndex = (musicIndex + 1) % songs.length;
    nextSong.src = songs[nextIndex].path;
    nextSong.load();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);

    if (isPlaying) {
        music.play();
    }
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
  
    requestAnimationFrame(() => {
      progress.style.width = `${progressPercent}%`;
    });
  
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
  }
  

  function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    let clickX;
    if (e.type === 'touchstart' || e.type === 'touchmove') {
      clickX = e.touches[0].clientX - playerProgress.getBoundingClientRect().left;
      if (e.type === 'touchmove') {
        e.preventDefault();
      }
    } else {
      clickX = e.offsetX;
    }
    music.currentTime = (clickX / width) * music.duration;
  
    // Skip to the next song if the user is moving the song time past the end of the song
    if (music.currentTime >= music.duration) {
      changeMusic(1);
    }
  }
  

function redirectToWebsite() {
    window.open('https://soundcloud.com/user-190670813', '_blank');
}

function handleKeydown(event) {
    if (event.code === 'Space') {
        togglePlay();
    }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
playerProgress.addEventListener('touchstart', setProgressBar);
playerProgress.addEventListener('touchmove', setProgressBar)
image.addEventListener('click', redirectToWebsite);
document.addEventListener('keydown', handleKeydown);

loadMusic(songs[musicIndex]);
