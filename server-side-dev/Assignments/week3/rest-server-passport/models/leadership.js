var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var leaderSchema = new Schema({
	name:{
		type: String,
		required:true,
		unique:true
	},
	image:{
		type: String,
		required: true
	},
	designation:{
		type: String
	},
	abbr:{
		type: String
	},
	description:{
		type:String,
		required:true
	},
},{
	timestamps:true
});

// now that the schema is defined, we need to create a model using it:
var leadership = mongoose.model('leadership', leaderSchema);

module.exports = leadership;
