//Cupom Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";

//Create Cupom Table
var _createTable = function(client){
  //Table Script
  client.query("CREATE TABLE IF NOT EXISTS cupons ("
                + "coo   NUMERIC(6) PRIMARY KEY,"
                + "data  DATE,"
                + "cnpj  VARCHAR(18),"
                + "valor NUMERIC(11,2)"
              + ");");
}

//Insert new Cupom on Table
var _insertCupom = function(cupom, next){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //PostgreSQL Query to Create a new cupom
  client.query("INSERT INTO cupons (coo, data, cnpj, valor) values ($1, $2, $3, $4)", [cupom.coo, cupom.data, cupom.cnpj, cupom.valor]).then(function(){
    //End Connection
    client.end();

    //Execute after Query Ends
    next("Ok");

  }, function(err){

    //Execute after Error
    next(err);
  });
}

//Select ALL cupons
var _selectCupom = function(next){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

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
    next(result.rows);
  });
}

//Delete Specific Cupom
var _deleteCupom = function(cupom, next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //PostgreSQL Query to Delete a specific cupom
  client.query("DELETE FROM cupons WHERE coo=$1",[cupom.coo]).then(function(){

    //End Connection
    client.end();

    //Execute after Query Ends
    next("Ok");

  }, function(err){

    //Execute after Error
    next(err);
  });
}

//Delete All Cupom
var _deleteAll = function(next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //PostgreSQL Query to Drop Cupom Table
  client.query("DROP TABLE cupons").then(function(){

    //Creata Table Cupom
    _createTable(client);

    //Execute after Query End
    next("Ok");

  }, function(err){
    //Execute after Error
    next(err)
  });
}

//Functions to be Exported
module.exports = {
  insertCupom: _insertCupom,
  selectCupom: _selectCupom,
  deleteCupom: _deleteCupom,
  deleteAll:   _deleteAll
}
