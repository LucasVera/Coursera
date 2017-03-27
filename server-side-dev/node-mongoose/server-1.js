var mongoose = require('mongoose');
var assert = require('assert');

var dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	console.log('Connected to mongoose');

	// create new dish
	var newDish = dishes({
		name: 'Uthapizza',
		description: 'Test'
	});

	// save the newly created dish
	newDish.save(function(err){
		if (err){
			throw err;
		}
		console.log('dish created');

		//get all users
		dishes.find({}, function(err, dishes){
			if (err){
				throw err;
			}
			console.log(dishes);
			db.collection('dishes').drop(function(){
				db.close();
			});
		});
	});
});
