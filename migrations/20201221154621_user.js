exports.up = function(knex) {
    return knex.schema.createTable('user', table=>{
        table.increments('id').unsigned().primary();
        table.dateTime('updatedAt').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());//this creates a column called createdAt with the type of timestamp which  will also defaul to the current time at transaction

        table.string('username').notNull();
        table.string('image_url').notNull();
        table.text('content').nullable();
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');

};