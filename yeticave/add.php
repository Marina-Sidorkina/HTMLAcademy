<?php
require_once "initial.php";

if (!isset($_SESSION["user"])) {
    header("HTTP/1.0 403 Forbidden");
    $content = "Доступ заблокирован, необходимо зарегистрироваться!";
    $title = "Ошибка";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $lot = $_POST;
    $category_field = isset($lot["category"]) ? $lot["category"] : "";
    $lot["category"] = isset($lot["category"]) ? get_category_id_by_name($link, $lot["category"]) : null;
    $errors = check_lot_data($lot);

    if (!empty($_FILES["lot-img"]["name"])) {
        $tmp_name = $_FILES["lot-img"]["tmp_name"];
        $path = $_FILES["lot-img"]["name"];
        $file_type = mime_content_type($tmp_name);
        if ($file_type !== "image/png"
            and $file_type !== "image/jpeg"
            and $file_type !== "image/jpg") {
            $errors["lot-img"] = "Изображение должно быть в формате png, jpeg, или jpg";
        } else {
            move_uploaded_file($tmp_name, 'uploads/' . $path);
            $lot["lot-img"] = "uploads/" . $path;
        }
    } else {
        $errors["lot-img"] = "Вы не загрузили файл";
    };

    if (empty($errors)) {
        $id = add_new_lot($link, $lot);
        header("Location: lot.php?lot_id=" . $id);
        exit();
    }

    $content = include_template("add.php",
        ["categories" => $categories, "errors" => $errors, "lot" => $lot, "category_field" => $category_field]);
    $title = "Ошибка";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);

} else {
    $content = include_template("add.php", ["categories" => $categories]);
    $title = "Добавить лот";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);
}
