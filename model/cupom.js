//Cupom Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";
// const connectionString = "postgres://postgres:mateus123mudar@localhost:5432/ebm_notas";

//Create Cupom Table
var _createTable = function(client){

  // Desculpe-me Programadores
  client.query("CREATE TYPE ESTADO AS ENUM('nao cadastrado', 'cadastrado', 'cadastro erro', 'captcha erro')").catch(() => {});

  client.query("CREATE TABLE IF NOT EXISTS cupons ("
                + "id        SERIAL PRIMARY KEY,"
                + "coo       VARCHAR(6),"
                + "data      DATE,"
                + "cnpj      VARCHAR(18),"
                + "valor     NUMERIC(11,2),"
                + "criado_em DATE DEFAULT CURRENT_DATE,"
                + "estado    ESTADO DEFAULT 'nao cadastrado'"
              + ");");
}

//Insert new Cupom on Table
var _insertCupom = function(cupom){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //Create Table if it does not exist
    _createTable(client);

    //PostgreSQL Query to Create a new cupom
    client.query("INSERT INTO cupons (coo, data, cnpj, valor) values ($1, $2, $3, $4)", [cupom.coo, cupom.data, cupom.cnpj, cupom.valor]).then(function(){

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

//Select ALL cupons
var _selectCupom = function(){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to Get a ll cupons
    var query = client.query("SELECT * from cupons");

    //Add Each Cupom
    query.on("row", function (row, result) {

      result.addRow(row);
    });

    //Query End
    query.on("end", function (result) {

      //End Connection
      client.end();

      //Execute after Query Ends (Returning Cupons)
      resolve(result.rows);
    });
  });
}

//Delete Specific Cupom
var _deleteCupom = function(id){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to Delete a specific cupom
    client.query("DELETE FROM cupons WHERE id=$1",[id]).then(function(){

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

//Delete All Cupom
var _deleteAll = function(){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {

      //PostgreSQL Query to Drop Cupom Table
      client.query("DROP TABLE cupons").then(function(){

        //Creata Table Cupom
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
  insertCupom: _insertCupom,
  selectCupom: _selectCupom,
  deleteCupom: _deleteCupom,
  deleteAll:   _deleteAll
}
