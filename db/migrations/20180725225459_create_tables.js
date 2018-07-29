exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('username');
      table.text('bio');
      table.string('email');
      table.string('password');
      table.string('color');
    }),
    knex.schema.createTable('maps', function (table) {
      table.increments('id');
      table.string('name');
      table.string('latitude_center');
      table.string('longitude_center');
      table.integer('user_id').references('users.id');
    }),
    knex.schema.createTable('likes', function (table) {
      table.increments('id');
      table.integer('user_id').references('users.id');
      table.integer('map_id').references('maps.id');
    }),
    knex.schema.createTable('pins', function (table) {
      table.increments('id');
      table.string('title');
      table.text('description');
      table.string('latitude');
      table.string('longitude');
      table.integer('delete_id');
      table.integer('user_id').references('users.id');
      table.integer('map_id').references('maps.id');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pins'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('users')
  ])
};
