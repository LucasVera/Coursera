var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(function(req, res, next){
	//res.end('Sending all dishes');
	Dishes.find({}, function(err, dish){
		if (err){
			throw err;
		}
		res.json(dish);
	});
})
.post(function(req, res, next){
	//res.end('Adding dish ' + req.body.name + '. Details: ' + req.body.description);
	Dishes.create(req.body, function(err, dish){
		if (err){
			throw err;
		}
		console.log('Dish created!');
		var dishId = dish._id;

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Added dish with id: ' + dishId);
	});
})
.delete(function(req, res, next){
	//res.end('Deleting all dishes!');
	Dishes.remove({}, function(err, result){
		if (err){
			throw err;
		}

		console.log('Deleted all dishes');
		res.json(result);
	});
})
;

dishRouter.route('/:dishId')
.get(function(req, res, next){
	//res.end('Retrieving dish ' + req.params.dishId);
	Dishes.findById(req.params.dishId, function(err, dish){
		if (err){
			throw err;
		}
		console.log('Found dish ' + dish.name);
		res.json(dish);
	});
})
.put(function(req, res, next){
	//res.end('Updating dish ' + req.params.dishId);
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true}, function(err, dish){
		if (err){
			throw err;
		}
		console.log('Updating dish ' + dish.name);
		res.json(dish);
	});
})
.delete(function(req,res,next){
	//res.end('Deleting dish ' + req.params.dishId);
	Dishes.findByIdAndRemove(req.params.dishId, function(err, result){
		if (err){
			throw err;
		}
		res.json(result);
	});
})
;

dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;
