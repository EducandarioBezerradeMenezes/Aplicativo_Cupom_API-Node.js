//Cupom Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
// var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";
const connectionString = "postgres://postgres:mateus123mudar@localhost:5432/ebm_notas";

//Create Cupom Table
var _createTable = function(client){

  //Table Script
  client.query("CREATE TABLE IF NOT EXISTS cupons ("
                + "coo    NUMERIC(6) PRIMARY KEY,"
                + "data   DATE,"
                + "cnpj   VARCHAR(18),"
                + "valor  NUMERIC(11,2),"
                + "estado NUMERIC(1) DEFAULT 0"
              + ");");
}

//Insert new Cupom on Table
var _insertCupom = function(cupom){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  var defer = Promise.defer();

  //Create Table if it does not exist
  _createTable(client);

  //PostgreSQL Query to Create a new cupom
  client.query("INSERT INTO cupons (coo, data, cnpj, valor) values ($1, $2, $3, $4)", [cupom.coo, cupom.data, cupom.cnpj, cupom.valor]).then(function(){

    //End Connection
    client.end();

    //Resolves Promise after Query Ends
    defer.resolve("OK");

  }, function(err){

    //Rejects Promise
    defer.reject(err);
  });

  //Return the promise
  return defer.promise;
}

//Select ALL cupons
var _selectCupom = function(){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //Creates Promise
  var defer = Promise.defer();

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
    defer.resolve(result.rows);
  });

  //Return the promise
  return defer.promise;
}

//Delete Specific Cupom
var _deleteCupom = function(cupom){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  var defer = Promise.defer();

  //PostgreSQL Query to Delete a specific cupom
  client.query("DELETE FROM cupons WHERE coo=$1",[cupom.coo]).then(function(){

    //End Connection
    client.end();

    //Resolves Promise after Query End
    defer.resolve("OK");

  }, function(err){

    //Rejects Promise
    defer.reject(err);
  });

  //Return the promise
  return defer.promise;
}

//Delete All Cupom
var _deleteAll = function(){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  var defer = Promise.defer();

  //PostgreSQL Query to Drop Cupom Table
  client.query("DROP TABLE cupons").then(function(){

    //Creata Table Cupom
    _createTable(client);

    //Executes after Query End
    defer.resolve("OK");

  }, function(err){

    //Rejects Promise
    defer.reject(err);
  });

  //Return the promise
  return defer.promise;
}

//Functions to be Exported
module.exports = {
  insertCupom: _insertCupom,
  selectCupom: _selectCupom,
  deleteCupom: _deleteCupom,
  deleteAll:   _deleteAll
}
