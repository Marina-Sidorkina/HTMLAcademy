<?php
require_once "initial.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user;
    $errors = [];
    $form = $_POST;
    $required_fields = ["email", "password", "name", "message"];
    $errors = check_required_fields($required_fields, $form);

    if (!isset($form["email"]) || !filter_var($form["email"], FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Указан некорректный адрес";
    } else {
        $user = check_user($link, $form["email"]);
        if ($user) {
            $errors["email"] = "Аккаунт с указанным адресом уже зарегистрирован";
        }
    }

    if (!empty($_FILES["user-img"]["name"])) {
        $tmp_name = $_FILES["user-img"]["tmp_name"];
        $path = $_FILES["user-img"]["name"];
        $file_type = mime_content_type($tmp_name);
        if ($file_type !== "image/png"
            and $file_type !== "image/jpeg"
            and $file_type !== "image/jpg") {
            $errors["user-img"] = "Изображение должно быть в формате png, jpeg, или jpg";
        } else {
            move_uploaded_file($tmp_name, 'uploads/' . $path);
            $form["user-img"] = "uploads/" . $path;
        }
    }

    if (empty($errors) and !$user) {
        add_new_user($link, $form);
        header("Location: login.php");
        exit();
    }

    $content = include_template("sign-up.php", ["categories" => $categories, "errors" => $errors, "form" => $form]);
    $title = "Ошибка";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);

} else {
    $content = include_template("sign-up.php", ["categories" => $categories]);
    $title = "Регистрация";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);
}
