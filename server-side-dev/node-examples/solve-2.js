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

solveRect(2,4);
console.log("");
solveRect(3,0);
console.log("");
solveRect(-2,-2);

