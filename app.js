// Funkcja pobierająca dane filmów z serwera
async function fetchMovies() {
    try {
        const response = await fetch('fetch_movies.php');
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Funkcja generująca siatkę filmów
async function generateMovieGrid() {
    const movieGrid = document.getElementById('movie-grid');
    const movies = await fetchMovies();
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <img src="${movie.thumbnail}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <button class="play-button">Odtwórz</button>
            </div>
        `;
        movieItem.querySelector('.play-button').addEventListener('click', () => playVideo(movie.src, movie.title));
        movieGrid.appendChild(movieItem);
    });
}

// Funkcje obsługi odtwarzacza wideo
const videoElement = document.getElementById('video-element');
const playerContainer = document.getElementById('player-container');
const customVideoPlayer = document.getElementById('custom-video-player');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time-display');
const muteButton = document.getElementById('mute');
const fullscreenButton = document.getElementById('fullscreen');
const closeButton = document.getElementById('close-button');
const movieTitleElement = document.getElementById('movie-title');

let hideControlsTimeout;

function playVideo(videoSrc, title) {
    videoElement.src = videoSrc;
    playerContainer.style.display = 'flex';
    document.title = `NtX - ${title}`;
    movieTitleElement.textContent = title;
    videoElement.play();
    showControls();
}

function togglePlayPause() {
    if (videoElement.paused) {
        videoElement.play();
    } else {
        videoElement.pause();
    }
}

function updateProgress() {
    const value = (videoElement.currentTime / videoElement.duration) * 100;
    progress.style.width = `${value}%`;
    timeDisplay.textContent = `${formatTime(videoElement.currentTime)} / ${formatTime(videoElement.duration)}`;
}

function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / progressBar.offsetWidth;
    videoElement.currentTime = pos * videoElement.duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleMute() {
    videoElement.muted = !videoElement.muted;
    muteButton.textContent = videoElement.muted ? '🔇' : '🔊';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (playerContainer.requestFullscreen) {
            playerContainer.requestFullscreen();
        } else if (playerContainer.mozRequestFullScreen) {
            playerContainer.mozRequestFullScreen();
        } else if (playerContainer.webkitRequestFullscreen) {
            playerContainer.webkitRequestFullscreen();
        } else if (playerContainer.msRequestFullscreen) {
            playerContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function showControls() {
    customVideoPlayer.classList.remove('hide-controls');
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        customVideoPlayer.classList.add('hide-controls');
    }, 3000); // Ukryj kontrolki po 3 sekundach bezczynności
}

// Dodawanie nasłuchiwania zdarzeń
playPauseButton.addEventListener('click', togglePlayPause);
videoElement.addEventListener('play', () => playPauseButton.textContent = '❚❚');
videoElement.addEventListener('pause', () => playPauseButton.textContent = '▶');
videoElement.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', seek);
muteButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullscreen);
closeButton.addEventListener('click', () => {
    playerContainer.style.display = 'none';
    videoElement.pause();
    document.title = 'NtX';
});

// Dodanie nasłuchiwania zdarzeń dla pokazywania kontrolek
customVideoPlayer.addEventListener('mousemove', showControls);
customVideoPlayer.addEventListener('touchstart', showControls, { passive: true });

// Obsługa klawiszy
document.addEventListener('keydown', function(e) {
    if (playerContainer.style.display === 'flex') {
        switch(e.code) {
            case 'Space':
                togglePlayPause();
                e.preventDefault();
                break;
            case 'Escape':
                playerContainer.style.display = 'none';
                videoElement.pause();
                break;
            case 'KeyM':
                toggleMute();
                break;
            case 'KeyF':
                toggleFullscreen();
                break;
            case 'ArrowLeft':
                videoElement.currentTime -= 10;
                break;
            case 'ArrowRight':
                videoElement.currentTime += 10;
                break;
        }
        showControls();
    }
});

// Inicjalizacja strony
window.addEventListener('load', generateMovieGrid);

// Obsługa przewijania strony dla efektu przezroczystości nagłówka
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});