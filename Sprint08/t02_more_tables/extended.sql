USE ucode_web;

CREATE TABLE IF NOT EXISTS powers (
    id INT AUTO_INCREMENT,
    name TEXT NOT NULL,
    type ENUM('attack', 'defense') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS heroes_powers (
    hero_id INT NOT NULL,
    power_id INT NOT NULL,
    power_points INT NOT NULL,
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS races (
    id INT AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE heroes
ADD race_id INT;

ALTER TABLE heroes
ADD CONSTRAINT fk_race
FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS heroes_teams (
    hero_id INT NOT NULL,
    team_id INT NOT NULL,
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);
