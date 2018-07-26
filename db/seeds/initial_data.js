exports.seed = function (knex, Promise) {
  return knex('pins').del()
    .then(() => {
      return knex('likes').del();
    })
    .then(() => {
      return knex('maps').del();
    })
    .then(() => {
      return knex('users').del()
    })
    .then(() => {
      return knex('users').insert({
        username: 'Mark',
        email: 'mark@mark.com',
        password: 'mark',
        color: '#ffff00'
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'Lisa',
        email: 'lisa@lisa.com',
        password: 'lisa',
        color: '#ff00ff'
      });
    })
    .then(() => {
      return knex('maps').insert({
        name: 'map1',
        latitude_center: '49.2827',
        longitude_center: '-123.1207',
        user_id: 1
      });
    })
    .then(() => {
      return knex('maps').insert({
        name: 'map2',
        latitude_center: '49.2827',
        longitude_center: '-123.1207',
        user_id: 2
      });
    })
    .then(() => {
      return knex('likes').insert({
        user_id: 1,
        map_id: 2
      });
    })
    .then(() => {
      return knex('likes').insert({
        user_id: 2,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'starbucks',
        description: 'Its a starbucks',
        latitude: '49.2827',
        longitude: '-123.1207',
        user_id: 1,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'starbucks, again',
        description: 'Its another starbucks',
        latitude: '49.2827',
        longitude: '-123.1207',
        user_id: 2,
        map_id: 2
      });
    })
};