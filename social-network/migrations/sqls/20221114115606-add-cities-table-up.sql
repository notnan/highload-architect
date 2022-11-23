CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO cities (name) VALUES ('Москва'), ('Санкт-петербург'), ('Тюмень'), ('Екатиринбург');
