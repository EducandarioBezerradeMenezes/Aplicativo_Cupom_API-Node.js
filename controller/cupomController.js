//Cupom Controller
//Create the Routes for Cupom

var express = require('express');

var Cupom    = require('../model/cupom');
var Request = require('../model/request');

var router  = express.Router();

router.route('/cupom')

  //GET (Select) all Cupons
  .get(function(req, res){

    Request.insertRequest(req);

    Cupom.selectCupom(function(cupom){
      res.json(cupom);
    });
  })

  //POST (Insert) new Cupom
  .post(function(req, res){

    Request.insertRequest(req);

    Cupom.insertCupom(req.body, function(result){
      res.json(result);
    });
  })

  //DELETE (Delete) Specific Cupom
  .delete(function(req, res){

    Request.insertRequest(req);

    Cupom.deleteCupom(req.body, function(result){
      res.json(result)
    });
  });

module.exports = router;
