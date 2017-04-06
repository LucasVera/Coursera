var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Promos = require('../models/promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	//res.end('Sending all promotion information');
	Promos.find({}, function(err, promos){
		if (err){
			throw err;
		}
		console.log('Found all promotions');
		res.json(promos);
	});
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	//res.end('Adding promotion ' + req.body.name + '. Details: ' + req.body.description);
	Promos.create(req.body, function(err, promo){
		if (err){
			throw err;
		}
		console.log('created promotion ' + promo._id);
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end('Added promotion with id ' + promo._id);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	//res.end('Deleting all promotions!');
	Promos.remove({}, function(err, result){
		if (err){
			throw err;
		}
		console.log('removed all promotions!');
		res.json(result);
	});
})
;

promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	//res.end('Retrieving promotion ' + req.params.promoId);
	Promos.findById(req.params.promoId, function(err, promo){
		if (err){
			throw err;
		}
		console.log('found promo ' + promo._id);
		res.json(promo);
	});
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	//res.end('Updating promotion ' + req.params.promoId);
	Promos.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true}, function(err, promo){
		if (err){
			throw err;
		}
		console.log('updated promo ' + promo.name);
		res.json(promo);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
	//res.end('Deleting promotion ' + req.params.promoId);
	Promos.findByIdAndRemove(req.params.promoId, function(err, result){
		if (err){
			throw err;
		}
		console.log('removed promotion ' + req.params.promoId);
		res.json(promo);
	});
})
;

module.exports = promoRouter;
