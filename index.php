<!DOCTYPE HTML>
<?php
$isGET = false;
$page = "index";
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $isGet = true;
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
        $path = "/home/" . get_current_user() . "/iroe-lore/html/" . $page . ".html";
        if (file_exists($path)) {
            include($path);
        }
        else {
            echo "File does not exist";
        }
        ?>
    </body>
</html>

