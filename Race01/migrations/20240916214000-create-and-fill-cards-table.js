exports.up = function (db, callback) {
    db.dropTable('cards', {ifExists: true}, function (err) {
        if (err) return callback(err);

        db.createTable('cards', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            alias: {
                type: 'string',
                length: 30,
                unique: true,
                notNull: true
            },
            points_of_attack: {
                type: 'int',
                notNull: true
            },
            points_of_defence: {
                type: 'int',
                notNull: true
            },
            price: {
                type: 'int',
                notNull: true
            },
            avatar: {
                type: 'string',
                length: 35,
                unique: true,
                notNull: true,
            }
        }, function (err) {
            if (err) return callback(err);

            const insertQuery = `
            INSERT INTO cards (alias, points_of_attack, points_of_defence, price, avatar)
            VALUES
                ('Iron Man', 7, 6, 7, 'ironman.jpg'),
                ('Captain America', 5, 8, 6, 'captain_america.jpg'),
                ('Thor', 9, 4, 8, 'thor.jpg'),
                ('Hulk', 8, 7, 9, 'hulk.jpg'),
                ('Black Widow', 4, 5, 3, 'black_widow.jpg'),
                ('Hawkeye', 3, 4, 2, 'hawkeye.jpg'),
                ('Spider-Man', 6, 5, 5, 'spiderman.jpg'),
                ('Black Panther', 7, 5, 6, 'black_panther.jpg'),
                ('Scarlet Witch', 6, 4, 5, 'scarlet_witch.jpg'),
                ('Vision', 5, 6, 5, 'vision.jpg'),
                ('Ant-Man', 3, 6, 4, 'antman.jpg'),
                ('Doctor Strange', 5, 7, 6, 'doctor_strange.jpg'),
                ('Captain Marvel', 7, 5, 7, 'captain_marvel.jpg'),
                ('Falcon', 4, 6, 3, 'falcon.jpg'),
                ('Thanos', 10, 7, 10, 'thanos.jpg'),
                ('Loki', 6, 6, 5, 'loki.jpg'),
                ('Deadpool', 8, 5, 8, 'deadpool.jpg'),
                ('Groot', 3, 9, 4, 'groot.jpg'),
                ('Drax', 4, 6, 3, 'drax.jpg'),
                ('Star-Lord', 5, 5, 4, 'star_lord.jpg');
        `;
            db.runSql(insertQuery, callback);
        });
    });
};

exports.down = function (db, callback) {
    db.dropTable('cards', callback);
};
