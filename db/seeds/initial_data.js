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
        description: 'I love coffee and Ryan Reynolds!',
        email: 'mark@mark.com',
        password: 'mark',
        color: '#ffff00'
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'Lisa',
        description: 'I love coffee, but Ryan Reynolds is just okay.',
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
        latitude: '49.2827',
        longitude: '-123.1207',
        user_id: 1,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'tim hortons',
        latitude: '49.2825',
        longitude: '-123.1214',
        user_id: 2,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'starbucks, again',
        latitude: '49.2827',
        longitude: '-123.1207',
        user_id: 2,
        map_id: 2
      });
    })
};
