require('dotenv').config()
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
  }
})


knex.schema.hasTable('Users').then(function (exists) { //post
  if (!exists) {

    return knex.schema.createTable('Users', function (table) {
      table.increments("id").primary();
      table.string("FirstName", 255)
      table.string("LastName", 255)
      table.string("Email", 255).notNullable().unique();
      table.string("Password", 255)



    }).then(() => {
      console.log('table created');
    }).catch((err) => {
      console.log(err)
    })
  }
});




knex.schema.hasTable('Post').then(function (exists) {
  if (!exists) {

    return knex.schema.createTable('Post', function (t) {
      t.increments('Post_id').primary();
      t.integer('User_id', 255)
      t.string('Title', 255);
      t.string('Description', 255);

    }).then(() => {
      console.log('table created');
    }).catch((err) => {
      console.log(err)
    })
  }
});





knex.schema.hasTable('likedislike').then(function (exists) {
  if (!exists) {

    return knex.schema.createTable('likedislike', function (t) {

      t.increments('id').primary();
      t.integer('Post_id')
      t.integer('User_id')
      t.boolean('Like').defaultTo(false)
      t.boolean('Dislike').defaultTo(false)


    }).then(() => {
      console.log('table created');
    }).catch((err) => {
      console.log(err)
    })
  }
});




module.exports = knex