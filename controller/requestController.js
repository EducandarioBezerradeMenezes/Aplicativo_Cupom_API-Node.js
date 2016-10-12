//Request Controller
//Create the Routes for Request

var express = require('express');

var Request   = require('../model/request');

var router  = express.Router();

router.route('/request')

  //GET (Select) all Requests
  .get(function(req, res){

    Request.selectRequest(function(requests){
      res.json(requests);
    });
  });

router.route('/delete')
  //DELETE All Requests
  .get(function(req, res){
    Request.deleteAll(function(result){
      res.json(result);
    });
  });

module.exports = router;
