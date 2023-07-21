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
    </head>
    <body>
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
    </body>
</html>

