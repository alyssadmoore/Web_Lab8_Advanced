var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.get('/convert', function(req, res){
  var amount = req.query.amount;
  var from_currency = req.query.from_currency;
  var to_currency = req.query.to_currency;
  var url = "http://api.fixer.io/latest?base=" + from_currency;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      var rate = response.rates[to_currency];
      result = amount * rate;
      res.render('results', { amount : amount, from_currency : from_currency,
                              result : result, to_currency : to_currency })
  };
});

module.exports = router;
