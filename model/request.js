//Request Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";

//Create Request Table
var _createTable = function(client){
  //Table Script
  client.query("CREATE TABLE IF NOT EXISTS requests ("
                + "number   NUMERIC(5) PRIMARY KEY,"
                + "date     VARCHAR(255),"
                + "ip       VARCHAR(255),"
                + "protocol VARCHAR(255),"
                + "method   VARCHAR(255),"
                + "agent    VARCHAR(255),"
                + "host     VARCHAR(255),"
                + "url      VARCHAR(255),"
                + "body     VARCHAR(255)"
              + ");");
}

var _requestInfo = function(req, client, next){

  var query = client.query("SELECT MAX(number) FROM requests");

  //Add Each Request
  query.on("row", function (row, result) {

    result.addRow(row);
  });

  //Query End
  query.on("end", function (result) {

    var number = (result.rows[0].max || 0);
    number++;
    console.log(number);
    //Request Information
    var request = {
      number:   number,
      date:     new Date().toString(),
      ip:       req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      protocol: req.protocol,
      method:   req.method,
      agent:    req.headers['user-agent'],
      host:     req.headers.host,
      url:      req.url,
      body:     JSON.stringify(req.body)
    };
    //Execute after Query End
    next(request);
  });
}

//Insert new Request on Table
var _insertRequest = function(req, next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //Filter Request Information
  _requestInfo(req, client, function(r){

    //Insertion Query
    client.query("INSERT INTO requests (number, date, ip, protocol, method, agent, host, url, body) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [r.number, r.date, r.ip, r.protocol, r.method, r.agent, r.host, r.url, r.body]).then(function(){

      next(r);

    }, function(err){
      next(err);
    });

  });
}

//Select ALL Requests
var _selectRequest = function(next){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  var query = client.query("SELECT * from requests");

  //Add Each Request
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

//Delete Specific Request
var _deleteRequest = function(request, next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Deletion Query
  client.query("DELETE FROM requests WHERE number=$1",[request.number]).then(function(){
    next("Ok");

  }, function(err){
    next(err);
  });
}

//Delete All Requests
var _deleteAll = function(next){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Drop Request Table
  client.query("DROP TABLE requests").then(function(){

    //Creata Table Request
    _createTable(client);

    next("Ok");

  }, function(err){
    next(err)
  });
}

module.exports = {
  insertRequest: _insertRequest,
  selectRequest: _selectRequest,
  deleteRequest: _deleteRequest,
  deleteAll:     _deleteAll,
};
