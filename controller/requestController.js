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

      //Success in GET
      res.json(requests);

    }).catch(err =>{

      //Error in GET
      res.status(500).send(err);
    });;
  });

module.exports = router;
