CREATE DATABASE ucode_web;

CREATE USER 'oboltenkov'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON ucode_web.* TO 'oboltenkov'@'localhost';
