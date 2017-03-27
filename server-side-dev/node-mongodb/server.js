var mongoClient = require('mongodb').MongoClient
var assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log('Connected to server');

	dboper.insertDocument(db, {name:'Vadonut', description:'Test'}, 'dishes', function(result){
		console.log(result.ops);

		dboper.findDocument(db, 'dishes', function(docs){
			console.log(docs);

			dboper.updateDocument(db, 'dishes', {name: 'Vadonut'}, {description:'Updated description!'}
			, function(result){
				
				console.log(result.result);
				dboper.findDocument(db, 'dishes', function(docs){
					console.log(docs);
					db.dropCollection('dishes', function(result){
						console.log(result);
						db.close();
					});
				});
			});
		});
	});
});
