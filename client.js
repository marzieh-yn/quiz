const knex=require('knex'); // Requiring Knex module 
const developmentConfig=require('./knexfile').development; // Reuiring development object of knexfile.js to create client

const client = knex(developmentConfig); // using above to variables to create a client




module.exports=client; // exporting the client to be used from other parts of app
