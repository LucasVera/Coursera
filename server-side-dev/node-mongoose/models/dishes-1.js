var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	description:{
		type: String,
		required: true
	}
}, {
	timestamps: true
});

//the schema is created but we need a model based on it.
var dishes = mongoose.model('Dish', dishSchema);

module.exports = dishes;
