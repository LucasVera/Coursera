var User = require('../models/users');
var jwt = require('jsonwebtoken'); // <--- create, sign and verify tokens
var config = require('../config.js');

exports.getToken = function(user){
	return jwt.sign(user, config.secretKey,{
		expiresIn:3600
	});
}

exports.verifyOrdinaryUser = function(req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token){
		jwt.verify(token, config.secretKey, function(err, decoded){
			if (err){
				var error = new Error('You are not authenticated.');
				error.status = 401;
				return next(error);
			}
			else{
				// if there's no error, decode cookie and save it in request to use in other
				// routes
				req.decoded = decoded;
				next();
			}
		});
	}
	else{
		// return error if there's no token present.
		 var err = new Error('No token provided.');
		 err.status = 403;
		 return next();
	}
}
