<?php
require_once "helpers.php";
require_once "mysql/requests.php";
session_start();

$link = create_link();
$categories = get_categories($link);
$user_name = set_user($_SESSION);
check_categories($categories, $user_name);
$categories_block = include_template("categories-block.php", ["categories" => $categories]);
