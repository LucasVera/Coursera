var rect = require('./rectangle-1');


function solveRect(b,h){
	console.log("Solving for rectangle with base: " + b + " and height: " + h);

	if (b <= 0 || h <= 0){
		console.log("Rectangle dimensions should be greater than zero...");
	}
	else{
		console.log("Area: " + rect.area(b,h));
		console.log("Perimeter: " + rect.perimeter(b,h));
	}
}


solveRect(2,3);
console.log("\n");
solveRect(1,5);
