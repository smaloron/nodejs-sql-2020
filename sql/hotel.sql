USE sql_2020;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS hostels;
CREATE TABLE hostels(
    id SMALLINT UNSIGNED AUTO_INCREMENT,
    hostel_name VARCHAR(80) NOT NULL,
    town VARCHAR(50) NOT NULL,
    rating TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

SET foreign_key_checks = 1;

INSERT INTO hostels (hostel_name, town, rating)
VALUES
('Lutecia', 'Paris', 5),
('Hôtel de la plage', 'Le Havre', 3),
('Hôtel de le truite', 'Quingey', 2);