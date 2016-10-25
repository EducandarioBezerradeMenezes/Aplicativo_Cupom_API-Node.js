//Request Controller
//Create the Routes for Request

//Require Node Modules
var express = require('express');

//Require created Models
var Request = require('../model/request');
var Cupom   = require('../model/cupom');
var Chave   = require('../model/chave');

//Creates Routes
var router  = express.Router();

//Methods For Route /request
router.route('/request')

  //GET (Select) all Requests
  .get(function(req, res){

    Request.selectRequest().then(function(requests){
      res.json(requests);
    });
  });

//Methods For Route /delete
router.route('/delete')

  //DELETE EVERYTHING
  .get(function(req, res){

    //Drop and creates Tables
    Request.deleteAll()
      .then(Cupom.deleteAll())
      .then(Chave.deleteAll())
      .then(function(result){
        res.json(result);
      });
  });

module.exports = router;
