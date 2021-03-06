var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	rating:{
		type: Number,
		min:1,
		max:5,
		required:true
	},
	comment:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	}
},{
	timestamp:true
});

var dishSchema = new Schema({
	name:{
		type: String,
		required:true,
		unique:true
	},
	image:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	label:{
		type: String,
		default: ""
	},
	price:{
		type: Currency,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	comments:[commentSchema]
},{
	timestamps:true
});

// now that the schema is defined, we need to create a model using it:
var dishes = mongoose.model('dish', dishSchema);

module.exports = dishes;
