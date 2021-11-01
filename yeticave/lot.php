<?php
require_once "initial.php";

$title;
$lot;
$bets;
$id;
$content;
$error;
$all_bets = [];

if (isset($_GET["lot_id"])) {
    $id = (int)$_GET["lot_id"];
    $lot = get_lot_by_id($link, $id);
    $all_bets = get_bets_by_lot($id);
};

if ($lot and $_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];
    $form = $_POST;
    $required_fields = ["cost"];
    $errors = check_required_fields($required_fields, $form);

    if ($form["cost"] < ($lot["price"] + $lot["step"])) {
        $errors["cost"] = "Ставка должна быть больше, чем текущая цена лота + шаг ставки";
    }

    if (!(is_numeric($form["cost"])) or (((int)$form["cost"]) <= 0)
        or !(filter_var($form["cost"], FILTER_VALIDATE_INT))) {
        $errors["cost"] = "Содержимое поля должно быть целым числом больше нуля";
    }

    if (empty($errors)) {
        add_new_bet($link, $id, $_SESSION["user"]["id"], $form["cost"]);
        $all_bets[] = $form["cost"];
        header("Location: " . $_SERVER["REQUEST_URI"]);
        exit();
    }

    $content = include_template("lot.php",
        ["lot" => $lot, "categories" => $categories, "errors" => $errors, "form" => $form, "all_bets" => $all_bets]);
    $title = $lot["title"];
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);
    exit();
}

if ($lot) {
    $content = include_template("lot.php", [
        "lot" => $lot,
        "categories" => $categories,
        "all_bets" => $all_bets
    ]);
    $title = $lot["title"];
    $error = false;
} else {
    $content = include_template("404.php", ["categories" => $categories]);
    $title = "Страница не найдена";
    $error = true;
};

$layout = get_layout($content, $title, $categories, $user_name, $categories_block);

if ($error) {
    header("HTTP/ 1.1 404 Not found");
}

print($layout);
