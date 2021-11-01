<?php
require_once "initial.php";

$main_block_class = "container";
$content = include_template(get_active_lots($link)["template"], get_active_lots($link)["params"]);
$title = "Главная страница";

$layout = include_template("layout.php", [
    "content" => $content,
    "title" => $title,
    "user_name" => $user_name,
    "categories" => $categories,
    "main_block_class" => $main_block_class
]);

print($layout);
require_once "getwinner.php";
