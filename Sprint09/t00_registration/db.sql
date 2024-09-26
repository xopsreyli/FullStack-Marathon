USE ucode_web;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    login VARCHAR(30) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email, login)
);
