exports.seed = function(knex, Promise) {
  return knex('users_example').del()
    .then(function () {
      return Promise.all([
        knex('users_example').insert({id: 1, name: 'Alice'}),
        knex('users_example').insert({id: 2, name: 'Bob'}),
        knex('users_example').insert({id: 3, name: 'Charlie'})
      ]);
    });
};
