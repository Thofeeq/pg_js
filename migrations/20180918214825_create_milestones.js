
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones',function(t){
    t.increments('id');
    t.string('description',255);
    t.date('date_achieved');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
