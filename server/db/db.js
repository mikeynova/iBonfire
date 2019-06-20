const config = require('../../knex.js');
const env = 'development';
const knex = require('knex')(config[env]);

module.exports = knex;

// The ensureSchema function builds the schema for the db
knex.ensureSchema = () => {
  return Promise.all([
    knex.schema.hasTable('Users')
    .then((exists) => {
      if (!exists) {
        knex.schema.createTable('Users', (table) => {
            table.increments('id').primary();
            table.string('name', 50);
            table.string('bio', 200);
            table.string('latitude', 50);
            table.string('longitude', 50);
            table.string('cityState', 50);
            table.string('FB_id', 50);
            table.string('FB_img', 150);
            table.string('FB_timeline', 150);
            table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
            table.timestamps();
          })
          .then((table) => {
            console.log('Users Table has been created.');
          });
      }
    }),

    knex.schema.hasTable('Bonfires')
    .then((exists) => {
      if (!exists) {
        knex.schema.createTable('Bonfires', (table) => {
            table.increments('id').primary();
            table.string('tags', 50);
            table.string('description', 255);
            table.string('latitude', 50);
            table.string('longitude', 50);
            table.string('cityState', 50);
            table.string('createdBy', 50);
            table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
            table.timestamps();
          })
          .then((table) => {
            console.log('Bonfires Table has been created.');
          });
      }
    }),

    knex.schema.hasTable('Users_Bonfires')
    .then((exists) => {
      if (!exists) {
        knex.schema.createTable('Users_Bonfires', (table) => {
            table.increments('id').primary();
            table.string('id_Users').references('FB_id').inTable('Users');
            table.string('id_Bonfires').references('id').inTable('Bonfires');
          })
          .then((table) => {
            console.log('Users_Bonfires join table has been created.');
          });
      }
    }),

    knex.schema.hasTable('Chats')
    .then((exists) => {
      if (!exists) {
        knex.schema.createTable('Chats', (table) => {
            table.increments('id').primary();
            table.string('id_Bonfires');
          })
          .then((table) => {
            console.log('Chats Table has been created.')
          });
      }
    }), 

    knex.schema.hasTable('Messages')
    .then((exists) => {
      if (!exists) {
        knex.schema.createTable('Messages', (table) => {
            table.increments('id').primary();
            table.string('id_Users').references('FB_id').inTable('Users');
            table.string('Chats_id').references('id').inTable('Chats');
            table.string('name');
            table.string('messages');
            table.timestamp('created_by_User_at').defaultTo(knex.fn.now());
          })
          .then((table) => {
            console.log('Messages Table has been created.');
          });
      }
    })
  ]);
};
