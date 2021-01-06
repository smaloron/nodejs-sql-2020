USE sql_2020;

CREATE TABLE IF NOT EXISTS users(
	id INT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(30) NOT NULL,
    pwd VARCHAR(64) NOT NULL,
    username VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

truncate users;

INSERT INTO users
(login, pwd, username)
VALUES
('toto', SHA1('123'), 'toto le héro'),
('tata', SHA1('123'), 'tata yoyo');