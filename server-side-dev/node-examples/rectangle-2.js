module.exports = function(b,h,callback){
	try{
		if (b <= 0 || h <= 0)
		{
			throw new Error("Rectangle dimensions should be greater than zero.");
		}
		else{
			callback(null, {
				perimeter: function(){
					return (2*(b+h));
				},
				area: function(){
					return (b*h);
				}
			});
		}
	}
	catch (error){
		callback(error, null);
	}
}