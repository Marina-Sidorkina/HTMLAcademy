<?php
require_once "initial.php";

$layout;
$category_id = $_GET["category"];
$category_name = get_category_name_by_id($link, $category_id);

$lots = get_all_lots_by_category($link, $category_id) ?? [];

if ($lots) {
    $cur_page = $_GET["page"] ?? 1;
    $page_items = 9;
    $items_count = count($lots);
    $pages_count = ceil($items_count / $page_items);
    $offset = ($cur_page - 1) * $page_items;
    $pages = range(1, $pages_count);
    $lots = array_slice($lots, $offset, $page_items);
    $content = include_template("all-lots.php", [
        "categories" => $categories,
        "lots" => $lots,
        "category_name" => $category_name,
        "category_id" => $category_id,
        "pages_count" => $pages_count,
        "pages" => $pages,
        "cur_page" => $cur_page
    ]);
    $title = "Поиск";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
} else {
    $content = "По вашему запросу ничего не найдено...";
    $title = "Поиск";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
}

print($layout);
