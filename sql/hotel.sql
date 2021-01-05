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

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT,
    room_name VARCHAR(50) NOT NULL,
    price SMALLINT UNSIGNED,
    hotel_id SMALLINT UNSIGNED,
    PRIMARY KEY (id),
    CONSTRAINT rooms_to_hostels
        FOREIGN KEY (hotel_id)
        REFERENCES hostels(id)
);

SET foreign_key_checks = 1;

CREATE OR REPLACE VIEW view_hostels AS
SELECT 
	hostels.*,
    COUNT(rooms.id) as nunber_of_rooms,
    AVG(rooms.price) as average_price
FROM hostels
JOIN rooms ON hostels.id = rooms.hotel_id
GROUP BY hostels.id;

CREATE OR REPLACE VIEW view_rooms AS
SELECT rooms.*, hostel_name
FROM rooms
JOIN hostels ON hostels.id = rooms.hotel_id;


INSERT INTO hostels (hostel_name, town, rating)
VALUES
('Lutecia', 'Paris', 5),
('Hôtel de la plage', 'Le Havre', 3),
('Hôtel de le truite', 'Quingey', 2);

INSERT INTO rooms (room_name, price, hotel_id)
VALUES
('101', 50, 1), ('205', 80, 1), ('318', 120, 1),
('Chambre bleue', 180, 2), ('Suite royale', 380, 2),
('Chambre Courbet', 150, 3), ('Chambre Cézane', 200, 3);