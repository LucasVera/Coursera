var mongoose = require('mongoose');
var assert = require('assert');

var dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
	console.log('Connected to server');

	dishes.create({
		name: 'Uthapizza',
		description:' Test'
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

		var id = dish._id;
		setTimeout(function(){
			dishes.findByIdAndUpdate(id, {
				$set:{
					description:'Updated test'
				}
			},{
				new:true
			}).exec(function(err, dish){
				if (err){
					throw err;
				}
				console.log('Updated dish!');
				console.log(dish);

				dish.comments.push({
					rating: 5,
					comment: 'superb pizza',
					author: 'the other guy'
				});

				dish.save(function(err, dish){
					console.log('Updated Comments!');
					console.log(dish);
					db.collection('dishes').drop(function(){
						db.close();
					});
				});
			});
		}, 3000);
	});
});
