//Cupom Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
var connectionString = "postgresql://postgres:postgres@localhost:5432/postgres";

//Create Cupom Table
var _createTable = function(client){
  //Table Script
  client.query("CREATE TABLE IF NOT EXISTS cupoms ("
                + "coo   NUMERIC(6) PRIMARY KEY,"
                + "data  VARCHAR(10),"
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

  //Insertion Query
  client.query("INSERT INTO cupoms (coo, data, cnpj, valor) values ($1, $2, $3, $4)", [cupom.coo, cupom.data, cupom.cnpj, cupom.valor]).then(function(){
    next("Ok");
  }, function(err){
    next(err);
  });
}

//Select ALL Cupons
var _selectCupom = function(next){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  var query = client.query("SELECT * from cupoms");

  //Add Each Cupom
  query.on("row", function (row, result) {

    result.addRow(row);
  });

    //Query End
  query.on("end", function (result) {
    client.end();

    //Execute after Query End
    next(result.rows);
  });
}

//Delete Specific Cupom
var _deleteCupom = function(cupom, next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Deletion Query
  client.query("DELETE FROM cupoms WHERE coo=$1",[cupom.coo]).then(function(){
    next("Ok");

  }, function(err){
    next(err);
  });
}

module.exports = {
  insertCupom: _insertCupom,
  selectCupom: _selectCupom,
  deleteCupom: _deleteCupom,
}
