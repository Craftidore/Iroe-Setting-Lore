<!DOCTYPE HTML>
<?php
$isGET = false;
$page = "index";
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $isGET = true;
    if($_GET["page"] && trim($_GET["page"]) !== "") {
        $page = trim($_GET["page"]);
        $page = str_replace("..", "", $page);
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
    </head>
    <body>
        <?php 
        $startPath = "/home/" . get_current_user() . "/iroe-lore/html/";
        $path = $page . ".html";
        if (file_exists($path)) {
            $path = realpath($path);
            echo "<!--" . $path . "-->";
            if (substr($path, 0, strlen($startPath)) === $startPath) {
                readfile($path);
            }
            else {
                echo "Invalid location; please stay within the correct directory";
            }
        }
        else {
            echo "File does not exist";
        }
        ?>
    </body>
</html>

