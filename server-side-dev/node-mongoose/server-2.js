var mongoose = require('mongoose');
var assert = require('assert');

var dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	//connected
	console.log('Connected successfully');

	dishes.create({
		name:'Uthapizza',
		description: 'Test'
	}, function(err, dish){
		if (err){
			throw err;
		}
		console.log('dish created');
		console.log(dish);

		var id = dish._id;

		// get all dishes
		setTimeout(function(){
			dishes.findByIdAndUpdate(id, {
				$set:{
					description: 'Updated test'
				}
			}, {
				new: true
			}).exec(function(err, dish){
				if (err){
					throw err;
				}
				console.log('Updated dish successfully');
				console.log(dish);

				db.collection('dishes').drop(function(){
					db.close();
				});
			});
		}, 3000);
	});
});
