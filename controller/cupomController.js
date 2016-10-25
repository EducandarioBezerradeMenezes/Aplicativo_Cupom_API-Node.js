//Cupom Controller
//Create the Routes for Cupom

//Require Node Modules
var express = require('express');

//Require created Models
var Cupom    = require('../model/cupom');
var Chave    = require('../model/chave');
var Request  = require('../model/request');

//Creates Route
var router  = express.Router();


//Methods For Route /cupom
router.route('/cupom')

  //GET (Select) all Cupons
  .get(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Get Cupons
    Cupom.selectCupom().then(function(cupom){
      res.json(cupom);
    });
  })

  //POST (Insert) new Cupom
  .post(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a  Cupom
    Cupom.insertCupom(req.body).then(function(result){
      res.json(result);
    });
  })

  //DELETE (Delete) Specific Cupom
  .delete(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Deletes a  Cupom
    Cupom.deleteCupom(req.body).then(function(result){
      res.json(result)
    });
  });

//Methods for route /chave
router.route('/chave')
  //GET (Select) all chaves
  .get(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a Chave
    Chave.selectChave().then(function(chave){
      res.json(chave);
    });

  })

  //POST (Insert) new Chave
  .post(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a  Chave
    Cupom.insertCupom(req.body).then(function(result){
      res.json(result);
    });
  })

  //DELETE (Delete) Specific Chave
  .delete(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Deletes a Chave
    Cupom.deleteCupom(req.body).then(function(result){
      res.json(result)
    });
  });

//Exporting Routes
module.exports = router;
