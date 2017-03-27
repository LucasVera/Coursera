var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending all promotion information');
})
.post(function(req, res, next){
	res.end('Adding promotion ' + req.body.name + '. Details: ' + req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting all promotions!');
})
;

promoRouter.route('/:promoId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Retrieving promotion ' + req.params.promoId);
})
.put(function(req, res, next){
	res.end('Updating promotion ' + req.params.promoId);
})
.delete(function(req,res,next){
	res.end('Deleting promotion ' + req.params.promoId);
})
;

module.exports = promoRouter;
