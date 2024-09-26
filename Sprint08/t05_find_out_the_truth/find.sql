USE ucode_web;

SELECT heroes.id, heroes.name
FROM heroes
INNER JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
INNER JOIN races ON heroes.race_id = races.id
WHERE races.name != 'Human'
    AND heroes.name LIKE '%a%'
    AND heroes.class_role IN ('tankman', 'healer')
GROUP BY heroes.id
HAVING COUNT(heroes_teams.hero_id) >= 2
ORDER BY heroes.id ASC
LIMIT 1;
