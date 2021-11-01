<?php
require_once "initial.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];
    $password_validity = false;
    $form = $_POST;
    $required_fields = ["email", "password"];
    $errors = check_required_fields($required_fields, $form);
    $user = isset($form["email"]) ? check_user($link, $form["email"]) : false;

    if ($user) {
        $password_validity = password_verify($form['password'], $user['password']);
    } else {
        $errors["email"] = "Такой пользователь не найден";
    }

    if (!$password_validity) {
        $errors["password"] = "Неверный пароль";
    }

    if (empty($errors)) {
        $_SESSION["user"] = $user;
        header("Location: index.php");
        exit();
    }

    $content = include_template("login.php", ["categories" => $categories, "errors" => $errors, "form" => $form]);
    $title = "Ошибка";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
    print($layout);

} else {
    if (isset($_SESSION["user"])) {
        header("Location: index.php");
    } else {
        $content = include_template("login.php", ["categories" => $categories]);
        $title = "Вход";
        $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
        print($layout);
    }
}
