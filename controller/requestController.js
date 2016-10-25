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
      res.json(err);
    });;
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

        //Sucess in DELETE ALL
        res.json(result);
      }).catch(err =>{

        //Error in DELETE ALL
        res.json(err);
      });
  });

module.exports = router;
