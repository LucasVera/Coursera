var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending all leaders information');
})
.post(function(req, res, next){
	res.end('Adding leader ' + req.body.name + '. Details: ' + req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting all leaders!');
})
;

leaderRouter.route('/:leaderId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Retrieving leader ' + req.params.leaderId);
})
.put(function(req, res, next){
	res.end('Updating leader ' + req.params.leaderId);
})
.delete(function(req,res,next){
	res.end('Deleting leader ' + req.params.leaderId);
})
;

module.exports = leaderRouter;
