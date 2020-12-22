// Update with your config settings.

module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'niloofar1371',
      database : 'Cluckr'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
    }
  }
};
