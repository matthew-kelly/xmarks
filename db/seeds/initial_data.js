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
        bio: "Ahoy, matey! Prow scuttle parrel provost. Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase.",
        email: 'mark@mark.com',
        password: 'mark',
        color: '#ffff00'
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'Lisa',
        bio: "Ahoy, matey! Handsomely walk the plank pink cable. Pirate Round boatswain clap of thunder boom yardarm prow. Squiffy spike smartly holystone reef sails barkadeer parrel bring a spring upon her cable run a rig schooner. Black spot snow trysail deadlights fire ship list prow heave down aft squiffy. Lugsail Buccaneer Plate Fleet gaff warp trysail furl Nelsons folly draught spanker. Galleon Sail ho driver rum squiffy to go on account scurvy parley lugger take a caulk. Clap of thunder overhaul pirate.",
        email: 'lisa@lisa.com',
        password: 'lisa',
        color: '#ff00ff'
      });
    })
    .then(() => {
      return knex('maps').insert({
        name: 'Buried Treasure',
        latitude_center: '49.2827',
        longitude_center: '-123.1207',
        user_id: 1
      });
    })
    .then(() => {
      return knex('maps').insert({
        name: 'Hidden Gems',
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
        title: 'Treasure chest full of gold?',
        description: "I'm sure I left it around here.",
        latitude: '49.2827',
        longitude: '-123.1207',
        delete_id: 997,
        user_id: 1,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'Spanish gold!',
        description: 'Pesky Cortez left it here.',
        latitude: '49.2825',
        longitude: '-123.1230',
        delete_id: 998,
        user_id: 2,
        map_id: 1
      });
    })
    .then(() => {
      return knex('pins').insert({
        title: 'Dogspot',
        description: 'Saw a cute poodle, very good dog. Had a pat.',
        latitude: '49.2827',
        longitude: '-123.1207',
        delete_id: 999,
        user_id: 2,
        map_id: 2
      });
    })
};
