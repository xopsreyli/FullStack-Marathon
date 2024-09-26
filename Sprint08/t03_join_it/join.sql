USE ucode_web;

SELECT heroes.name AS hero_name, teams.name AS team_name
FROM heroes
LEFT JOIN heroes_teams
    ON heroes.id = heroes_teams.hero_id
LEFT JOIN teams
    ON teams.id = heroes_teams.team_id;

SELECT powers.name AS power_name, heroes.name AS hero_name
FROM heroes
LEFT JOIN heroes_powers
    ON heroes.id = heroes_powers.hero_id
RIGHT JOIN powers
    ON powers.id = heroes_powers.power_id;

SELECT heroes.name AS hero_name, powers.name AS power_name, teams.name AS team_name
FROM heroes
INNER JOIN heroes_teams
    ON heroes.id = heroes_teams.hero_id
INNER JOIN teams
    ON teams.id = heroes_teams.team_id
INNER JOIN heroes_powers
    ON heroes.id = heroes_powers.hero_id
INNER JOIN powers
    ON powers.id = heroes_powers.power_id;
