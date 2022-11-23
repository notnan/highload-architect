CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    age INT,
    gender ENUM('MALE', 'FEMALE'),
    interests VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);