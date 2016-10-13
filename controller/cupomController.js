//Cupom Controller
//Create the Routes for Cupom

//Require Node Modules
var express = require('express');

//Require created Models
var Cupom    = require('../model/cupom');
var Request = require('../model/request');

//Creates Route
var router  = express.Router();


//Methods For Route /cupom
router.route('/cupom')

  //GET (Select) all Cupons
  .get(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Get Cupons
    Cupom.selectCupom(function(cupom){
      res.json(cupom);
    });
  })

  //POST (Insert) new Cupom
  .post(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Creates a  Cupom
    Cupom.insertCupom(req.body, function(result){
      res.json(result);
    });
  })

  //DELETE (Delete) Specific Cupom
  .delete(function(req, res){

    //Insert new Request
    Request.insertRequest(req);

    //Deletes a  Cupom
    Cupom.deleteCupom(req.body, function(result){
      res.json(result)
    });
  });


//Exporting Routes
module.exports = router;
