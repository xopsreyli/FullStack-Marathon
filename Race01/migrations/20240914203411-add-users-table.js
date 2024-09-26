exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    login: { type: 'string', unique: true, notNull: true },
    password: { type: 'string', notNull: true },
    avatar: { type: 'string', notNull: true},
    refresh_token: {type: 'string'}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
