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

    console.log('teste');

    //Insert new Request
    Request.insertRequest(req);

    //Get Cupons
    Cupom.selectCupom().then(function(cupom){

      //Success in GET
      res.json(cupom);

    }).catch(err =>{

      //Error in GET
      res.status(404).send(err);
    });
  })

  //POST (Insert) new Cupom
  .post(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a  Cupom
    Cupom.insertCupom(req.body).then(function(result){

      //Success in POST
      res.json(result);

    }).catch(err =>{

      //Error in POST
      res.status(203).send(err);
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

      //Success in GET
      res.json(chave);

    }).catch(err =>{

      //Error in GET
      res.status(404).send(err);
    });;
  })

  //POST (Insert) new Chave
  .post(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a  Chave
    Chave.insertChave(req.body).then(function(result){

      //Success in POST
      res.json(result);

    }).catch(err =>{

      //Error in POST
      res.status(203).send(err);
    });;
  });

//Exporting Routes
module.exports = router;
