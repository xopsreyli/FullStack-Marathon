USE ucode_web;

SELECT id, name
FROM heroes
INNER JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
GROUP BY hero_id
ORDER BY SUM(power_points) DESC, heroes.id ASC
LIMIT 1;

SELECT heroes.id, heroes.name
FROM heroes
INNER JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
INNER JOIN powers ON heroes_powers.power_id = powers.id
WHERE powers.type = 'defense'
GROUP BY hero_id
ORDER BY SUM(power_points) ASC, heroes.id ASC
LIMIT 1;

SELECT heroes.id, heroes.name, SUM(power_points) AS total_power
FROM heroes
INNER JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
INNER JOIN teams ON heroes_teams.team_id = teams.id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
WHERE teams.name = 'Avengers'
GROUP BY heroes.id
HAVING COUNT(heroes_teams.hero_id) = 1
ORDER BY total_power DESC;

SELECT teams.id, teams.name, SUM(heroes_powers.power_points) AS team_power
FROM teams
INNER JOIN heroes_teams ON teams.id = heroes_teams.team_id
INNER JOIN heroes ON heroes_teams.hero_id = heroes.id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
GROUP BY teams.id
ORDER BY team_power ASC;
