<?php
require_once "initial.php";

$layout;
$search = trim($_GET["search"] ?? "");

if ($search) {
    $lots = get_search_result($link, $search) ?? [];
    if ($lots) {
        $cur_page = $_GET["page"] ?? 1;
        $page_items = 9;
        $items_count = count($lots);
        $pages_count = ceil($items_count / $page_items);
        $offset = ($cur_page - 1) * $page_items;
        $pages = range(1, $pages_count);
        $lots = array_slice($lots, $offset, $page_items);
        $content = include_template("search.php", [
            "categories" => $categories,
            "lots" => $lots,
            "search" => $search,
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
} else {
    $content = "Выберите ключевые слова для поиска...";
    $title = "Поиск";
    $layout = get_layout($content, $title, $categories, $user_name, $categories_block);
}

print($layout);
