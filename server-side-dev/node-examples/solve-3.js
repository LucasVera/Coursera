var argv = require('yargs')
	.usage('Usage: node $0 --b=[num] --h=[num]')
	.demand(['b', 'h'])
	.argv
	;


var rect = require('./rectangle-2');

function solveRect(b,h){
	console.log("Solving for rectangle with base: " + b + " and height: " + h);
	rect(b, h, function(err, rectangle){
		if (err){
			console.log(err);
		}
		else{
			console.log("Area: " + rectangle.area());
			console.log("Perimeter: " + rectangle.perimeter());
		}
	});
};

solveRect(argv.b, argv.h);
