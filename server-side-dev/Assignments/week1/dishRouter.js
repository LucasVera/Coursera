var express = require('express');
var bodyParser = require('body-parser');

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending all dishes');
})
.post(function(req, res, next){
	res.end('Adding dish ' + req.body.name + '. Details: ' + req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting all dishes!');
})
;

dishRouter.route('/:dishId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Retrieving dish ' + req.params.dishId);
})
.put(function(req, res, next){
	res.end('Updating dish ' + req.params.dishId);
})
.delete(function(req,res,next){
	res.end('Deleting dish ' + req.params.dishId);
})
;

module.exports = dishRouter;
