<!DOCTYPE HTML>
<?php
$isGET = false;
$page = "index";
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $isGET = true;
    if($_GET["page"] && trim($_GET["page"]) !== "") {
        $page = trim($_GET["page"]);
    }
}
?>
<html>
    <head>
        <meta charset="utf-8">
    <title><?php 
            if (!$isGET) { echo "POST requests aren't supported"; }
            else {
                echo $page;
            }
        ?> - Iroe Wiki</title>
        <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
        <div class="navbar">
            <a href="?">Home</a>
            <a href="?page=About">About</a>
            <a href="?page=ToDo">To Do List</a>
        </div>
        <div class="main-content">
        <?php 
        $startPath = "/home/customer/iroe-lore/html/";
        $path = $startPath . $page . ".html";
        echo "<!--" . $path . "-->";
        $path = realpath($path);
        if (substr($path, 0, strlen($startPath)) === $startPath) {
            readfile($path);
        }
        else {
            echo "Invalid directory or file does not exist";
        }
        ?>
        </div>
    </body>
</html>

