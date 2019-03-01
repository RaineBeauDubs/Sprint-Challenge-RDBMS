
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(tbl){
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()

    tbl
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    tbl
      .text('discription')
      .notNullable()

    tbl
      .text('additional_notes')
      .notNullable()

    tbl
      .boolean('completed')
      .defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions');
};
