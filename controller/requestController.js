//Request Controller
//Create the Routes for Request

//Require Node Modules
var express = require('express');

//Require created Models
var Request   = require('../model/request');
var Cupom     = require('../model/cupom')
//Creates Routes
var router  = express.Router();

//Methods For Route /request
router.route('/request')

  //GET (Select) all Requests
  .get(function(req, res){

    Request.selectRequest(function(requests){
      res.json(requests);
    });
  });

//Methods For Route /delete
router.route('/delete')

  //DELETE All Requests
  .get(function(req, res){

    //Drop and creates a new Request Table
    Request.deleteAll(function(result){
      Cupom.deleteAll(function(result){
        res.json(result);
      });
    });
  });

module.exports = router;
