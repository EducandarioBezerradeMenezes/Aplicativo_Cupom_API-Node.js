//Chave Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";
// const connectionString = "postgres://postgres:mateus123mudar@localhost:5432/ebm_notas";

//Create Chave Table
var _createTable = function(client){

  // Desculpe-me Programadores
  client.query("CREATE TYPE ESTADO AS ENUM('nao cadastrado', 'cadastrado', 'cadastro erro', 'captcha erro')").catch(() => {});

  client.query("CREATE TABLE IF NOT EXISTS chaves ("
                + "id        SERIAL PRIMARY KEY,"
                + "valor     VARCHAR(100),"
                + "criado_em DATE DEFAULT CURRENT_DATE,"
                + "estado    ESTADO DEFAULT 'nao cadastrado'"
              + ");");
}

//Insert new Chave on Table
var _insertChave = function(chave){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //Create Table if it does not exist
    _createTable(client);

    //PostgreSQL Query to Create a new chave
    client.query("INSERT INTO chaves (valor) values ($1)", [chave.valor]).then(function(){

      //End Connection
      client.end();

      //Resolves Promise after Query Ends
      resolve("OK");

    }, function(err){

      //Rejects Promise
      reject(err);
    });
  });
}

//Select ALL chaves
var _selectChave = function(){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to Get all chaves
    var query = client.query("SELECT * from chaves");

    //Add Each Chave
    query.on("row", function (row, result) {

      result.addRow(row);
    });

    //Query End
    query.on("end", function (result) {

      //End Connection
      client.end();

      //Execute after Query Ends (Returning Chaves)
      resolve(result.rows);
    });
  });
}

//Delete Specific Chave
var _deleteChave = function(chave){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) =>{
    //PostgreSQL Query to Delete a specific chave
    client.query("DELETE FROM chaves WHERE valor=$1",[chave]).then(function(){

        //End Connection
        client.end();

        //Resolves Promise after Query End
        resolve("OK");

      }, function(err){

        //Rejects Promise
        reject(err);
      });
  });
}

//Delete All Chave
var _deleteAll = function(){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject)=> {

      //PostgreSQL Query to Drop Chave Table
      client.query("DROP TABLE chaves").then(function(){

        //Creata Table Chave
        _createTable(client);

        //Executes after Query End
        resolve("OK");

      }, function(err){

        //Rejects Promise
        reject(err);
      });
  });

}

//Functions to be Exported
module.exports = {
  insertChave: _insertChave,
  selectChave: _selectChave,
  deleteChave: _deleteChave,
  deleteAll:   _deleteAll
}
