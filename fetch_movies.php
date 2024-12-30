<?php
define('DB_NAME', '38586098_ntx');
define('DB_USER', '38586098_ntx');
define('DB_PASSWORD', 'N^bTx)*3%bY*MoV$');
define('DB_HOST', 'mysql8');
define('DB_CHARSET', 'utf8');

// Tworzenie po³¹czenia
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Sprawdzenie po³¹czenia
if ($conn->connect_error) {
    die("Po³¹czenie nieudane: " . $conn->connect_error);
}

// Ustawienie kodowania znaków
$conn->set_charset(DB_CHARSET);

// Pobieranie tylko widocznych filmów z bazy danych
$sql = "SELECT * FROM movies WHERE visible = 1";
$result = $conn->query($sql);

$movies = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}

// Zwracanie filmów jako JSON
header('Content-Type: application/json');
echo json_encode($movies);

$conn->close();
?>