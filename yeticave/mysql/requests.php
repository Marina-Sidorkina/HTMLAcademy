<?php
/**
 * Создаёт подключение к БД
 * @return mysqli Ресурс соединения
 */
function create_link()
{
    $link = mysqli_connect("localhost", "root", "", "yeti");
    mysqli_set_charset($link, "utf8");
    return $link;
}

/**
 * Подготавливает запрос и возвращает ссылку на данные по категориям лотов в БД
 * @param mysqli $link Ресурс соединения
 * @return mysqli Результат sql-запроса - ссылка на данные по категориям лотов в БД
 */
function get_categories_link($link)
{
    $sql = 'SELECT id, title, char_code FROM categories';
    return mysqli_query($link, $sql);
}

/**
 * Подготавливает запрос и возвращает ссылку на список активных лотов в БД
 * @param mysqli $link Ресурс соединения
 * @return mysqli Результат sql-запроса - ссылка на список активных лотов в БД
 */
function get_active_lots_link($link)
{
    $sql = 'SELECT c.title "category", l.id "id",
    l.title "title", l.description "description",
    l.price "price", l.bet_step "step", l.picture_url "url",
    l.expired_at "expirationDate" FROM lots l
    JOIN categories c ON l.category_id = c.id
    WHERE NOW() < l.expired_at
    ORDER BY l.created_at DESC';
    return mysqli_query($link, $sql);
}

/**
 * Подготавливает запрос и возвращает ссылку на лот по его ID в БД
 * @param mysqli $link Ресурс соединения
 * @param int $id ID лота
 * @return mysqli Результат sql-запроса - ссылка на лот по его ID в БД
 */
function get_lot_by_id_link($link, $id)
{
    $id = mysqli_real_escape_string($link, $id);
    $sql = 'SELECT c.title "category", l.id "id",
    l.title "title", l.description "description",
    l.price "price", l.bet_step "step", l.picture_url "url",
    l.user_id "user_id", l.expired_at "expirationDate" FROM lots l
    JOIN categories c ON l.category_id = c.id
    WHERE l.id = "' . $id . '"';
    return mysqli_query($link, $sql);
}

/**
 * Преобразует ссылку на данные из БД в ассоциативный массив
 * @param mysqli $result Результат sql-запроса
 * @return array Ассоциативный массив из данных из БД
 */
function get_array($result)
{
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

/**
 * Создаёт запрос в БД на получение списка категорий и в случае успешного ответа
 * преобразует данные в массив, в случае неудачного соединения - возвращает пустой массив
 * @param mysqli $link Ресурс соединения
 * @return array Массив данных по категориям лотов
 */
function get_categories($link)
{
    $categoriesLink;
    $result = [];
    if ($link) {
        $categoriesLink = get_categories_link($link);
    }
    if ($categoriesLink) {
        $result = get_array($categoriesLink) ?? [];
    }
    return $result;
}

;

/**
 * Создает запросы в БД на получение активных лотов и категорий лотов.
 * В зависимости от результатf запроса подготавливает параметры для функции include_template
 * @param mysqli $link Ресурс соединения
 * @return array Ассоциативный массив с параметрами для функции include_template
 */
function get_active_lots($link)
{
    if (!$link) {
        $template = "error.php";
        $params = ["error" => mysqli_connect_error()];
    } else {
        $lotsLink = get_active_lots_link($link);
        $categories = get_categories($link) ?? null;
        if ($lotsLink and $categories) {
            $lots = get_array($lotsLink);
            $template = "main.php";
            $params = ["categories" => $categories, "lots" => $lots];
        } else {
            $template = "error.php";
            $params = ["error" => mysqli_error($link)];
        }
        return [
            "params" => $params,
            "template" => $template
        ];
    }
}

/**
 * Создаёт запрос на получения лота по его ID и преобразует ответ в ассоциативный массив
 * @param mysqli $link Ресурс соединения
 * @param int $id ID лота
 * @return array Массив с данными о лоте при успешном запросе
 * или пустой массив при ошибке запроса
 */
function get_lot_by_id($link, $id)
{
    $lot = [];
    $id = mysqli_real_escape_string($link, $id);
    if ($link) {
        $lotLink = get_lot_by_id_link($link, $id);
        if ($lotLink) {
            $lot = mysqli_fetch_array($lotLink, MYSQLI_ASSOC);
        }
    }
    return $lot;
}

/**
 * Создаёт запрос на получение ID категории по её названию
 * @param mysqli $link Ресурс соединения
 * @param string $name Название категории
 * @return int ID категории
 */
function get_category_id_by_name($link, $name)
{
    $name = mysqli_real_escape_string($link, $name);
    $sql = 'SELECT * FROM categories c WHERE c.title = "' . $name . '"';
    $result = mysqli_query($link, $sql);
    return mysqli_fetch_array($result, MYSQLI_ASSOC)["id"];
}

/**
 * Создаёт запрос на получение названия категории по её ID
 * @param mysqli $link Ресурс соединения
 * @param int $id ID категории
 * @return string Название категории
 */
function get_category_name_by_id($link, $id)
{
    $id = mysqli_real_escape_string($link, $id);
    $sql = 'SELECT * FROM categories c WHERE c.id = "' . $id . '"';
    $result = mysqli_query($link, $sql);
    return mysqli_fetch_array($result, MYSQLI_ASSOC)["title"];
}

/**
 * Добавляет новый лот в БД на основе подготовленного выражения
 * @param mysqli $link Ресурс соединения
 * @param array $lot Данные о новом лоте в виде ассоциативного массива
 * @return int Возвращает автоматически генерируемый ID для нового лота
 */
function add_new_lot($link, $lot)
{
    $user_id = $_SESSION["user"]["id"];

    $sql = "INSERT INTO lots (
    created_at,
    winner_id,
    user_id,
    category_id,
    expired_at,
    title,
    description,
    picture_url,
    price,
    bet_step
  ) VALUES (
    NOW(), NULL, ?, ?, ?, ?, ?, ?, ?, ?
  )";
    $stmt = db_get_prepare_stmt($link, $sql, [
        $user_id,
        $lot["category"],
        $lot["lot-date"],
        $lot["lot-name"],
        $lot["message"],
        $lot["lot-img"],
        $lot["lot-rate"],
        $lot["lot-step"]
    ]);
    mysqli_stmt_execute($stmt);
    return mysqli_insert_id($link);
}

/**
 * Создаёт запрос на получение данных о пользователе по его email.
 * @param mysqli $link Ресурс соединения
 * @param string $user_email Email пользователя
 * @return array Если пользователь найден, возвращает массив данных о пользователе.
 * Если не найден - возвращает пустой массив
 */
function check_user($link, $user_email)
{
    $email = mysqli_real_escape_string($link, $user_email);
    $sql = 'SELECT * FROM users u
            WHERE u.email = "' . $email . '"';
    $result = mysqli_query($link, $sql);
    $user = $result ? mysqli_fetch_array($result, MYSQLI_ASSOC) : [];
    return $user;
}

/**
 * Добавляет данные о новом пользователе в БД
 * @param mysqli $link Ресурс соединения
 * @param array Данные формы регистрации нового пользователя
 */
function add_new_user($link, $form)
{
    $password = password_hash($form["password"], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (
    registered_at, name, email, password, contacts, avatar_url
  ) VALUES (
    NOW(), ?, ?, ?, ?, ?
  )";
    $stmt = db_get_prepare_stmt($link, $sql, [
        $form["name"],
        $form["email"],
        $password,
        $form["message"],
        $form["user-img"] ?? ""
    ]);
    mysqli_stmt_execute($stmt);
}

/**
 * Добавляет нову ставку в БД
 * @param mysqli $link Ресурс соединения
 * @param int $lot_id ID лота
 * @param int $user_id ID пользователя, добавившего ставку
 * @param int $bet_id Ставка
 */
function add_new_bet($link, $lot_id, $user_id, $bet)
{
    $sql = "INSERT INTO bets (
    created_at, lot_id, user_id, price
  ) VALUES (
    NOW(), ?, ?, ?
  )";
    $stmt = db_get_prepare_stmt($link, $sql, [
        $lot_id,
        $user_id,
        $bet
    ]);
    mysqli_stmt_execute($stmt);
    if (mysqli_insert_id($link)) {
        $lot_id = mysqli_real_escape_string($link, $lot_id);
        $bet = mysqli_real_escape_string($link, $bet);
        $sql = 'UPDATE lots SET price = "' . $bet . '" WHERE id = "' . $lot_id . '"';
        mysqli_query($link, $sql);
    }
}

/**
 * Получает из БД данные о всех ставках для лота по его ID
 * @param int $lot_id ID лота
 * @return array Массив данных о всех ставках для лота
 */
function get_bets_by_lot($lot_id)
{
    $link = create_link();
    $lot_id = mysqli_real_escape_string($link, $lot_id);
    $sql = 'SELECT u.name "user", b.lot_id,
    b.user_id, b.price, b.created_at FROM bets b
    JOIN users u ON b.user_id = u.id
    WHERE b.lot_id = "' . $lot_id . '"
    ORDER BY b.created_at DESC';
    $result = mysqli_query($link, $sql);
    $bets = get_array($result) ?? [];
    return $bets;
}

/**
 * Получает из БД данные о всех ставках пользователя по его ID
 * @param mysqli $link Ресурс соединения
 * @param int $user_id ID пользователя
 * @return array Массив данных о всех ставках пользозвателя
 */
function get_user_bets($link, $user_id)
{
    $user_id = mysqli_real_escape_string($link, $user_id);
    $sql = 'SELECT u.contacts "contacts", l.title "lot_title", l.id "lot_id",
    l.picture_url "url", l.winner_id "winner_id",
    l.expired_at "expired_at", c.title "category",
    b.price "price", b.created_at "bet_date" FROM bets b
    JOIN lots l ON b.lot_id = l.id
    JOIN users u ON l.user_id = u.id
    JOIN categories c ON l.category_id = c.id
    WHERE b.user_id = "' . $user_id . '"
    ORDER BY b.created_at DESC';
    $result = mysqli_query($link, $sql);
    return get_array($result);
}

/**
 * Получает массив всех лотов, в названии или описании которых
 * найдены соответствия поисковому
 * @param mysqli $link Ресурс соединения
 * @param string $search Запрос для поиска
 * @return Массив с данными о всех лотах, соответствующих запросу
 */
function get_search_result($link, $search)
{
    $search = mysqli_real_escape_string($link, $search);
    $sql = 'SELECT c.title "category", l.id "id",
    l.title "title", l.description "description",
    l.price "price", l.bet_step "step", l.picture_url "url",
    l.expired_at "expirationDate" FROM lots l
    JOIN categories c ON l.category_id = c.id
    WHERE MATCH(l.title, l.description) AGAINST(?)
    AND NOW() < l.expired_at
    ORDER BY l.created_at DESC';
    $stmt = db_get_prepare_stmt($link, $sql, [$search]);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

/**
 * Получает массив данных о всех лотах в запрашиваемой категории (по её ID)
 * @param mysqli $link Ресурс соединения
 * @param int $categoru_id ID категории
 * @return array Массив с данными о всех лотах в запрашиваемой категории
 */
function get_all_lots_by_category($link, $category_id)
{
    $category_id = mysqli_real_escape_string($link, $category_id);
    $sql = 'SELECT c.title "category", l.id "id",
    l.title "title", l.description "description",
    l.price "price", l.bet_step "step", l.picture_url "url",
    l.expired_at "expirationDate" FROM lots l
    JOIN categories c ON l.category_id = c.id
    WHERE l.category_id = ?
    AND NOW() < l.expired_at
    ORDER BY l.created_at DESC';
    $stmt = db_get_prepare_stmt($link, $sql, [$category_id]);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

/**
 * Записывает в БД данные о победителе торгов по лоту
 * @param mysqli $link Ресурс соединения
 * @param int $winner_id ID пользователя
 * @param int $lot_id ID лота
 */
function set_winner($link, $winner_id, $lot_id)
{
    $winner_id = mysqli_real_escape_string($link, $winner_id);
    $lot_id = mysqli_real_escape_string($link, $lot_id);
    $sql = 'UPDATE lots SET winner_id = "' . $winner_id . '" WHERE id = "' . $lot_id . '"';
    mysqli_query($link, $sql);
}

/**
 * Ищет все лоты, у которых не установлен победитель.
 * Ищет последнюю ставку по найденным лотам и её автора.
 * @param mysqli $link Ресурс соединения
 * @return array Массив с данными, необходимыми для объявления победителя
 */
function get_winner_data($link)
{
    $sql = 'SELECT b.user_id "winner_id",
    u.name "winner_name", u.email "winner_email",
    l.id "lot_id", l.title "lot_title" FROM lots l
    JOIN bets b ON l.id = b.lot_id AND l.price = b.price
    JOIN users u ON b.user_id = u.id
    WHERE NOW() <= l.expired_at AND l.winner_id IS NULL';
    $result = mysqli_query($link, $sql);
    return get_array($result);
}
