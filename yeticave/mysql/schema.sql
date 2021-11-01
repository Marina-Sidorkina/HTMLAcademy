CREATE DATABASE yeti
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
USE yeti;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title CHAR(200) NOT NULL UNIQUE,
  char_code CHAR(200) NOT NULL UNIQUE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registered_at TIMESTAMP NOT NULL,
  email CHAR(200) NOT NULL UNIQUE,
  name CHAR(200) NOT NULL UNIQUE,
  password CHAR(200) NOT NULL,
  avatar_url CHAR(200),
  contacts TEXT
);

CREATE TABLE bets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  price INT NOT NULL,
  user_id INT NOT NULL,
  lot_id INT NOT NULL
);

CREATE TABLE lots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  expired_at TIMESTAMP NOT NULL,
  title  CHAR(200) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  picture_url CHAR(200),
  bet_step INT,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  winner_id INT
);

CREATE UNIQUE INDEX user_name ON users(name);
CREATE INDEX lot_title ON lots(title);
CREATE FULLTEXT INDEX search ON lots(title, description);
