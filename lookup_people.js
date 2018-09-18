// Required setups
const pg = require("pg");
const settings = require("./settings"); // settings.json
const arg = process.argv.slice(2).join(""); //getting argument from command line (Name of the person being looked up)
const client = new pg.Client({ //passing the credentials/required info to access the db
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//connecting to the db
client.connect((err) => {       
  
  if (err) {
    return console.error("Connection Error", err);
  }
  //selecting the first name to query against the argument provided                                                             
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text",[arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    //looping through the records returned
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    console.log("Searching...");
    console.log(`Found ${result.rows.length} person(s) by the name ${arg}`);
    //formatting date to display yyyy-mm-dd  [toISOString sets yyyy mm dd format, using String.replace to replace '/' with '-']
    for(i = 0; i < result.rows.length; i++){
      console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${new Date(result.rows[i].birthdate).toISOString().split('T')[0].toLocaleString("en-US",options).replace(/\//ig,"-")}'`); 
    }
    //closing the db
    client.end();
    
  });
});  