var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaders = require('../models/leadership');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req, res, next){
	//res.end('Sending all leaders information');
	Leaders.find({}, function(err, leaders){
		if (err){
			throw err;
		}
		console.log('found leaders!');
		res.json(leaders);
	});
})
.post(function(req, res, next){
	//res.end('Adding leader ' + req.body.name + '. Details: ' + req.body.description);
	Leaders.create(req.body, function(err, leader){
		if (err){
			throw err;
		}
		console.log('leader created ' + leader.name);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Added leader with id: ' + leader._id);
	});
})
.delete(function(req, res, next){
	//res.end('Deleting all leaders!');
	Leaders.remove({}, function(err, result){
		if (err){
			throw err;
		}
		console.log('deleted all leaders!');
		res.json(result);
	});
})
;

leaderRouter.route('/:leaderId')
.get(function(req, res, next){
	//res.end('Retrieving leader ' + req.params.leaderId);
	Leaders.findById(req.params.leaderId, function(err, leader){
		if (err){
			throw err;
		}

		console.log('Found leader ' + leader.name);
		res.json(leader);
	});
})
.put(function(req, res, next){
	//res.end('Updating leader ' + req.params.leaderId);
	Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new: true}, function(err, leader){
		if (err){
			throw err;
		}
		console.log ('updated leader ' + leader.name);
		res.json(leader);
	});
})
.delete(function(req,res,next){
	//res.end('Deleting leader ' + req.params.leaderId);
	Leaders.findByIdAndRemove(req.params.leaderId, function(err, result){
		if (err){
			throw err;
		}
		console.log('leader deleted');
		res.json(result);
	});
})
;

module.exports = leaderRouter;
