//Request Model
//Comunication to Data Base

//Requiring PG Module
var pg = require('pg');

//Connect to PostgreSQL
pg.defaults.ssl = true;
//var connectionString = "postgres://palffuboakjyaz:FMMpU1-5Ot5STXlJvbrgKaIyt6@ec2-54-163-248-218.compute-1.amazonaws.com:5432/ddorvpnoikl99p";
const connectionString = "postgres://postgres:mateus123mudar@localhost:5432/ebm_notas";

//Create Request Table
var _createTable = function(client){
  //Table Script
  client.query("CREATE TABLE IF NOT EXISTS requests ("
                + "id         SERIAL PRIMARY KEY,"
                + "ip         VARCHAR(100),"
                + "protocol   VARCHAR(10),"
                + "method     VARCHAR(10),"
                + "agent      TEXT,"
                + "host       VARCHAR(100),"
                + "url        VARCHAR(100),"
                + "body       TEXT,"
                + "created_at DATE DEFAULT CURRENT_DATE"
              + ");");
}

//Get the info of the Request
var _requestInfo = function(req, client){

  return new Promise((resolve, reject) => {

    //Request Information
    var request = {
      date:     new Date(),
      ip:       req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      protocol: req.protocol,
      method:   req.method,
      agent:    req.headers['user-agent'],
      host:     req.headers.host,
      url:      req.url,
      body:     JSON.stringify(req.body)
    };

    resolve(request);
  });
}

//Insert new Request on Table
var _insertRequest = function(req){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Create Table if it does not exist
  _createTable(client);

  //Creates Promise
  return new Promise((resolve, reject) => {
    //Filter Request Information
    _requestInfo(req, client).then(function(r){

      //PostgreSQL Query to Create a new request
      client.query("INSERT INTO requests (created_at, ip, protocol, method, agent, host, url, body) values ($1, $2, $3, $4, $5, $6, $7, $8)", [r.date, r.ip, r.protocol, r.method, r.agent, r.host, r.url, r.body]).then(function(){

        //End Connection
        client.end();

        //Resolves Promise after Query Ends
        resolve(r);

      }, function(err){

        //Rejects Promise
        reject(err);
      });
    });
  });
}

//Select ALL Requests
var _selectRequest = function(){
  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to get all requests
    var query = client.query("SELECT * from requests");

    //Add Each Request
    query.on("row", function (row, result) {

      result.addRow(row);
    });

    //Query End
    query.on("end", function (result) {

      //End Connection
      client.end();

      //Execute after Query Ends (Returning Requests)
      resolve(result.rows);
    });
  });
}

//Delete Specific Request
var _deleteRequest = function(id){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to delete a specific requests
    client.query("DELETE FROM requests WHERE id=$1",[id]).then(function(){

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

//Delete All Requests
var _deleteAll = function(){

  //Connection
  var client = new pg.Client(process.env.DATABASE_URL || connectionString);
  client.connect();

  //Creates Promise
  return new Promise((resolve, reject) => {
    //PostgreSQL Query to Drop Request Table
    client.query("DROP TABLE requests").then(function(){

      //Creata Table Request
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
  insertRequest: _insertRequest,
  selectRequest: _selectRequest,
  deleteRequest: _deleteRequest,
  deleteAll:     _deleteAll,
};
