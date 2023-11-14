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
// Check if Playing
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
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);

    // Check if the music is playing before calling playMusic
    if (isPlaying) {
        music.play();
    }
}

// Update Progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const{duration, currentTime} = e.srcElement;
        // Upadate Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width=`${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
         // Delay switching current Element to avoid NaN
         if(durationSeconds){
            durationEl.textContent= `${durationMinutes}:${durationSeconds}`;
     }

        // Calculate display for current Time
        const currentMinutes = Math.floor(currentTime / 60); //*(converting to minutes)...
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;

        
    } 
}

// Set Progress Bar
function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration} = music;
    music.currentTime=(clickX / width) * duration; //gives the actual time at that point of the song...
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
image.addEventListener('click', redirectToWebsite);
document.addEventListener('keydown', handleKeydown);

// Load the initial song
loadMusic(songs[musicIndex]);