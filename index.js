const audio = new Audio();
const player = {
    currentIndex: 0,
    isPlaying: false,
};

const elements = {
    image: document.getElementById('cover'),
    title: document.getElementById('music-title'),
    artist: document.getElementById('music-artist'),
    currentTimeEl: document.getElementById('current-time'),
    durationEl: document.getElementById('duration'),
    progress: document.getElementById('progress'),
    playerProgress: document.getElementById('player-progress'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
    playBtn: document.getElementById('play'),
    background: document.getElementById('bg-img'),
};

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

// Preload and buffer audio
audio.preload = 'auto';
audio.addEventListener('canplay', function() {
    audio.play();
});

audio.addEventListener('canplay', function() {
    // Optionally, you can update the UI or take other actions here
});

audio.addEventListener('timeupdate', function() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    elements.progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
        elements.durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    elements.currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
});

function togglePlay() {
    player.isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    player.isPlaying = true;
    elements.playBtn.classList.replace('fa-play', 'fa-pause');
    elements.playBtn.setAttribute('title', 'Pause');
    audio.play();
}

function pauseMusic() {
    player.isPlaying = false;
    elements.playBtn.classList.replace('fa-pause', 'fa-play');
    elements.playBtn.setAttribute('title', 'Play');
    audio.pause();
}

function loadMusic(song) {
    audio.src = song.path;
    elements.title.textContent = song.displayName;
    elements.artist.textContent = song.artist;
    elements.image.src = song.cover;
    elements.background.src = song.cover;
}

function changeMusic(direction) {
    player.currentIndex = (player.currentIndex + direction + songs.length) % songs.length;
    loadMusic(songs[player.currentIndex]);

    if (player.isPlaying) {
        audio.play();
    }
}

function updateProgressBar({ target: { duration, currentTime } }) {
    if (player.isPlaying) {
        const progressPercent = (currentTime / duration) * 100;
        elements.progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds) {
            elements.durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        elements.currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = elements.playerProgress.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

function redirectToWebsite() {
    window.open('https://soundcloud.com/user-190670813', '_blank');
}

function handleKeydown(event) {
    if (event.code === 'Space') {
        togglePlay();
    }
}

elements.playBtn.addEventListener('click', togglePlay);
elements.prevBtn.addEventListener('click', () => changeMusic(-1));
elements.nextBtn.addEventListener('click', () => changeMusic(1));
audio.addEventListener('ended', () => changeMusic(1));
audio.addEventListener('timeupdate', updateProgressBar);
elements.playerProgress.addEventListener('click', setProgressBar);
elements.image.addEventListener('click', redirectToWebsite);
document.addEventListener('keydown', handleKeydown);

// Load the initial song
loadMusic(songs[player.currentIndex]);
