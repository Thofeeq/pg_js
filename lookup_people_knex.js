const arg = process.argv.slice(2).join("");
const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select('*').from('famous_people').where('first_name', '=', arg).asCallback(function(err,rows){
  if(err){
    console.log(err);
  }
  console.log(rows);
  knex.destroy();
})

