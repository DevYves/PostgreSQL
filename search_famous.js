const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const inputFromUser = process.argv[2];

function output(first, last, birthdate){
  console.log('Seaching...\n',
  'Found 1 person(s) by the name', "'"+last+ "':\n",
  '- 1: ' + first, last+', born '+"'"+birthdate.toISOString().slice(0,10)+ "'");
}


knex.select().from('famous_people')
.where('first_name', '=', inputFromUser)
.orWhere('last_name', '=', inputFromUser)


.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(rows);
});

