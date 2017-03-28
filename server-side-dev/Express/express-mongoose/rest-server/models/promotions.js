var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionsSchema = new Schema({
	name:{
		type: String,
		required:true,
		unique:true
	},
	image:{
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
	}
},{
	timestamps:true
});

// now that the schema is defined, we need to create a model using it:
var promotions = mongoose.model('promotions', promotionsSchema);

module.exports = promotions;
