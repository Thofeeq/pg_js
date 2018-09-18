const arg = process.argv.slice(2);
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

//Check if the provided argument is valid (Need 3 data for the 3 columns)
if(arg.length !== 3 ) {
  console.log('Error: Invalid input. Need EXACTLY 3 args[First Name, Last Name, D.O.B](in that order)'); 
} else {
  //knex insertion into table , use arg array to create the respective record
  knex('famous_people').insert({first_name: arg[0], last_name: arg[1], birthdate: arg[2]}).asCallback(function(err){
    if(err){
      console.log(err);  
    }
    else{
      console.log('Insertion successful');
      knex.destroy();
    }
  });
  
}

