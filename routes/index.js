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
  if (to_currency != from_currency) {
    // Using fixer.io to get a JSON response of conversion rates
    var url = "http://api.fixer.io/latest?base=" + from_currency;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    /* Once we have a response from fixer.io, we parse the results
       and access the conversion rate from that */
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        var rate = response.rates[to_currency];
        result = amount * rate;
        res.render('results', { amount : amount, from_currency : from_currency,
                                result : result, to_currency : to_currency })
    };
  // If the currencies are the same, the page is simply reloaded
  } else {
    res.render('index');
  }
});

module.exports = router;
