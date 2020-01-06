
exports.up = function(knex) {
    return knex.schema
      .createTable('chefs', tbl => {
          tbl.increments();
          tbl.string('name');
          tbl.string('username', 50)
              .notNullable()
              .unique();
          tbl.string('password', 100)
              .notNullable();
          tbl.string('location');
          tbl.string('contact_info');
      })
      .createTable('posts', tbl => {
          tbl.increments();
          tbl.string('image_url')
              .notNullable();
          tbl.string('title', 50)
              .notNullable();
          tbl.string('meal_type')
              .notNullable();
          tbl.text('ingredients')
              .notNullable();
          tbl.text('instructions')
              .notNullable();
          tbl.integer('chef_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('chefs')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('chefs')
    .dropTableIfExists('posts')
  };