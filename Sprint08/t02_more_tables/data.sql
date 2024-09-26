USE ucode_web;

INSERT INTO powers (name, type)
VALUES
    ('bloody first', 'attack'),
    ('iron shield', 'defense');

INSERT INTO races (name)
VALUES
    ('Human'),
    ('Kree');

INSERT INTO teams (name)
VALUES
    ('Avengers'),
    ('Hydra');

INSERT INTO heroes_powers (hero_id, power_id, power_points)
VALUES
    (1, 2, 100);

UPDATE heroes
SET race_id = 2
WHERE id IN (3, 5);

INSERT INTO heroes_teams (hero_id, team_id)
VALUES
    (2, 1),
    (6, 2);
