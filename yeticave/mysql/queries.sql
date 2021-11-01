/* Добавление категорий */
INSERT INTO categories (title, char_code) VALUES
  ('Доски и лыжи', 'boards'),
  ('Крепления', 'attachment'),
  ('Ботинки', 'boots'),
  ('Одежда', 'clothing'),
  ('Инструменты', 'tools'),
  ('Разное', 'other');

/* Добавление пользователей */
INSERT INTO users (name, email, password, avatar_url, contacts, registered_at) VALUES
  ('Tom', 'tom@gmail.com', '$2y$10$kRmoHaA/enJphFlPmxoI2OAu/qK0DlEdJ/NJHIiNuUXn6uzB7OdF.', 'tom_avatar.jpg', 'Beverly Hills, California, US', '2019-01-01 07:30'),
  ('Jerry', 'jerry@gmail.com', '$2y$10$Eg8V4knOEy2wm.a/U29u/.xUa.f415/Bcla6VKWm8N991G9CLZT0e', 'jerry_avatar.jpg', 'Beverly Hills, California, US', '2019-05-01 07:30');

/* Добавление лотов */
INSERT INTO lots (title, description, picture_url, price, bet_step, user_id, category_id, winner_id, created_at, expired_at) VALUES
  (
    '2014 Rossignol District Snowboard',
    'Lorem ipsum dolor sit amet, tation cotidieque ex eam, reque.',
    'img/lot-1.jpg',
    10999,
    5000,
    1,
    1,
    NULL,
    '2019-01-05 07:30',
    '2019-07-01 07:30'
  ),
  (
    'DC Ply Mens 2016/2017 Snowboard',
    'Lorem ipsum dolor sit amet, omnium appetere concludaturque mea eu.',
    'img/lot-2.jpg',
    159999,
    5000,
    1,
    1,
    NULL,
    '2019-01-05 07:30',
    '2019-07-10 07:30'
  ),
  (
    'Крепления Union Contact Pro 2015 года размер L/XL',
    'Lorem ipsum dolor sit amet, ut mei natum facete salutandi.',
    'img/lot-3.jpg',
    8000,
    5000,
    2,
    2,
    NULL,
    '2019-04-05 07:30',
    '2019-07-05 07:30'
  ),
  (
    'Ботинки для сноуборда DC Mutiny Charocal',
    'Lorem ipsum dolor sit amet, sea id doctus tacimates reprehendunt.',
    'img/lot-4.jpg',
    10999,
    5000,
    1,
    3,
    2,
    '2019-01-05 07:30',
    '2019-05-05 07:30'
  ),
  (
    'Куртка для сноуборда DC Mutiny Charocal',
    'Lorem ipsum dolor sit amet, decore laboramus vel ex in.',
    'img/lot-5.jpg',
    7500,
    5000,
    2,
    4,
    NULL,
    '2019-04-05 07:30',
    '2019-07-05 07:30'
  ),
  (
    'Маска Oakley Canopy',
    'Lorem ipsum dolor sit amet, fabulas propriae pri ne his.',
    'img/lot-6.jpg',
    5400,
    5000,
    1,
    6,
    NULL,
    '2019-04-05 07:30',
    '2019-07-05 07:30'
  );

/* Добавление ставок */
INSERT INTO bets (lot_id, user_id, price, created_at) VALUES
  (3, 1, 8000, '2019-04-15 05:30'),
  (4, 2, 10999, '2019-04-10 05:30');

/* Получить все категории */
SELECT * FROM categories;

/* Получить самые новые, открытые лоты. Каждый лот должен включать название, стартовую цену, ссылку на изображение, цену, название категории */
SELECT c.title 'Категория', b.price 'Текущая ставка', l.title 'Лот', l.picture_url 'Изображение', l.price 'Стартовая цена' FROM lots l
  JOIN categories c ON l.category_id = c.id
  JOIN bets b ON l.id = b.lot_id
  WHERE NOW() < l.expired_at AND l.winner_id IS NULL
  ORDER BY l.created_at DESC LIMIT 3;


/* Показать лот по его id. Получите также название категории, к которой принадлежит лот; */
SELECT c.title 'Категория', l.title 'Лот' FROM lots l
  JOIN categories c ON l.category_id = c.id
  WHERE l.id = 5;

/* Обновить название лота по его идентификатору; */
UPDATE lots SET title = '2019 Rossignol District Snowboard'
  WHERE id = 1;

/* Получить список самых свежих ставок для лота по его идентификатору. */
SELECT * FROM bets WHERE lot_id = 3
  ORDER BY created_at DESC LIMIT 3;
