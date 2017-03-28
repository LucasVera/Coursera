var mongoose = require('mongoose');
var assert = require('assert');

var dishes = require('./models/dishes');
var promotions = require('./models/promotions');
var leadership = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
	console.log('Connected to server');

	var dishId;
	var promoId;
	var leaderId;

	dishes.create({
		name: 'Uthapizzaaa',
		description:' Test',
		image: 'images/uthapizza.png',
		category: 'mains',
		price: '4.99',
		comments:[
			{
				rating:3,
				comment:'best pizza',
				author:'someone'
			}
		]
	}, function(err, dish){
		if (err){
			throw err;
		}
		console.log('Dish created!');
		console.log(dish);
		dishId = dish._id;
	});

	promotions.create({
		name: 'Weekendda Grand Buffet',
		image: 'images/buffet.png',
		label: 'New',
		price: '19.99',
		description: 'Superb Buffet!'
	}, function(err, promo){
		if (err){
			throw err;
		}

		console.log('promotion created!');
		console.log(promo);
		promoId = promo._id;
	});

	leadership.create({
		name: 'Peteer Paan',
		image: 'images/peter.png',
		designation: 'Chef',
		abbr: 'CHE',
		description: 'Our chef, peter ...'
	}, function(err, leader){
		if (err){
			throw err;
		}

		console.log('Leader created!');
		console.log(leader);
		leaderId = leader._id;
	});

	setTimeout(function(){
		dishes.findByIdAndRemove(dishId, function(err, result){
			if (err){
				throw err;
			}
			console.log('deleted dish');
		});
		promotions.findByIdAndRemove(promoId, function(err, result){
			if (err){
				throw err;
			}
			console.log('deleted promotion');
		});
		leadership.findByIdAndRemove(leaderId, function(err, result){
			if (err){
				throw err;
			}
			console.log('deleted leader');
		});
		setTimeout(function(){db.close();}, 800);
	}, 3000);
});
