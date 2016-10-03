'use strict';

angular.module('gymApp')
	.constant('baseURL', 'http://jsonplasceholder.typicode.com/')
	.service('usersFactory', ['$resource', 'baseURL', function($resource, baseURL){
		
		this.getUsers = function(){
			return $resource(baseURL + 'users/:user',{user: '@user'});
		};

	}]);






