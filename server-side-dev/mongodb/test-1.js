var mongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/test-1';

var insertDocuments = function(db, callback){
	var collection = db.collection('documents');
	collection.insertMany([
		{a:1}, {a:2}, {a:3}
	], function(err, result){
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log('Inserted 3 documents into the collection');
		callback(result);
	});
}

var findDocuments = function(db, callback){
	var collection = db.collection('documents');

	collection.find({'b': 3}).toArray(function(err, docs){
		assert.equal(err, null);
		console.log('found the following records\n');
		console.log(docs);
		callback(docs);
	});
}

var updateDocument = function(db, callback){
	var collection = db.collection('documents');

	collection.updateOne({a:2}, {$set: {b:1}}, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Updated document with field a equal to 2');
		callback(result);
	});
}

var removeDocument = function(db, callback){
	var collection = db.collection('documents');

	collection.deleteOne({a:3}, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Removed document with field a=3');
	});
}

var indexCollection = function(db, callback){
	db.collection('documents').createIndex(
		{'a':1},
		null,
		function(err, result){
			console.log(result);
			callback();
		}
	);
}

mongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log('Connected successfully to server');

	insertDocuments(db, function(){
		indexCollection(db, function(){
				updateDocument(db, function(){
					removeDocument(db, function(){
						db.close();
				});
			});
		});
	});
});


