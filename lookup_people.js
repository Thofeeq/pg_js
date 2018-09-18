const pg = require("pg");
const settings = require("./settings"); // settings.json
const arg = process.argv.slice(2).join("");
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  
  if (err) {
    return console.error("Connection Error", err);
  }                                                             
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text",[arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...");
    console.log(`Found ${result.rows.length} person(s) by the name ${arg}`);
    for(i = 0; i < result.rows.length; i++){
      console.log(`${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`); 
    }
    client.end();
  });
});