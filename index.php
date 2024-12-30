<!--Copyright by Juliusz Sagan. The right to copy is strictly prohibited! It is forbidden to use resources inappropriately!-->
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NtX</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <meta http-equiv="Cache-Control" content="max-age=31536000, public">
    <meta http-equiv="Expires" content="31536000">
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Style dla odtwarzacza wideo */
        
    </style>
</head>
<body>
    <header id="main-header">
        <h1>NtX</h1>
        <nav>
            <ul>
                <li><a href="#home">Strona główna</a></li>
                <li><a href="#movies">Filmy</a></li>
                <li><a href="#series">Seriale</a></li>
                <li><a href="#mylist">Moja lista</a></li>
            </ul>
        </nav>
    </header>
    
    <div class="movie-grid" id="movie-grid">
        <!-- Elementy filmów będą dynamicznie dodawane tutaj -->
    </div>

<div id="player-container">
        <div id="custom-video-player">
            <video id="video-element"></video>
            <div id="movie-title" class="movie-title"></div>
            <div id="controls">
                <button id="play-pause">▶</button>
                <div id="progress-bar">
                    <div id="progress"></div>
                </div>
                <span id="time-display">0:00 / 0:00</span>
                <div id="volume-control">
                    <button id="mute">🔊</button>
                    <div id="volume-bar">
                        <div id="volume"></div>
                    </div>
                </div>
                <button id="fullscreen">⛶</button>
            </div>
            <button id="close-button">✖</button>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
<!--Copyright by Juliusz Sagan. The right to copy is strictly prohibited! It is forbidden to use resources inappropriately!-->