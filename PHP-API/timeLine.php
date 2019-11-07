<?php
require __DIR__ . '/__connect_db.php';

// header("Access-Control-Allow-Origin: http://localhost:3000");

// $timeLineSql = "SELECT * FROM `br_list` ORDER BY `BR_release_time` DESC";
// $timeLineText = $pdo->query($timeLineSql)->fetchAll();

// echo json_encode($timeLineText);

if ($_SERVER['HTTP_ORIGIN'] == "http://localhost:3000") {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-type: application/xml');

    $timeLineSql = "SELECT * FROM `br_list` ORDER BY `BR_release_time` DESC";
    $timeLineText = $pdo->query($timeLineSql)->fetchAll();

    echo json_encode($timeLineText);
} else {
    header('Content-Type: text/html');
    echo "<html>";
    echo "<head>";
    echo "   <title>Another Resource</title>";
    echo "</head>";
    echo "<body>",
        "<p>This resource behaves two-fold:";
    echo "<ul>",
        "<li>If accessed from <code>http://arunranga.com</code> it returns an XML document</li>";
    echo   "<li>If accessed from any other origin including from simply typing in the URL into the browser's address bar,";
    echo   "you get this HTML document</li>",
        "</ul>",
        "</body>",
        "</html>";
}
