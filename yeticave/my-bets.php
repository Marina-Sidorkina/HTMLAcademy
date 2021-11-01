<?php
require_once "initial.php";

$layout;

if (isset($_SESSION["user"])) {
    $user_bets = get_user_bets($link, $_SESSION["user"]["id"]) ?? [];
    $content = include_template("my-bets.php", [
        "categories" => $categories,
        "user_bets" => $user_bets
    ]);
    $title = "Мои ставки";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
} else {
    header("HTTP/1.0 403 Forbidden");
    $content = "Доступ заблокирован, необходимо зарегистрироваться!";
    $title = "Ошибка";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
}

print($layout);
