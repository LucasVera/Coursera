var rect = {
	perimeter: function(b,h){
		return (2*(b+h));
	},
	area: function(b,h){
		return (b*h);
	}
};

function solveRect(b,h){
	console.log("Solving for rectangle with base = " + b + " and height = " + h);

	if (b <= 0 || h <= 0){
		console.log("Rectangle dimensions should be greater than zero...");
	}
	else{
		console.log("Area: " + rect.area(b,h));
		console.log("Perimeter: " + rect.perimeter(b,h));
	}
}


solveRect(2,4);
solveRect(3,5);
solveRect(0,1);
solveRect(9,-3);
solveRect(999,99);
