
'use strict';

/**
 * @ngdoc function
 * @name gymApp.controller:ExcercisesCtrl
 * @description
 * # ExcercisesCtrl
 * Controller of the gymApp
 */
angular.module('gymApp')
  .controller('UsersCtrl', ['$scope', 'usersFactory', function ($scope, usersFactory) {
    
  	$scope.showUsers = false;
  	$scope.usersMsg = "Loading...";

  	$scope.users = usersFactory.getUsers().query(
  		function(response){
  			$scope.users = response;
  			$scope.showUsers = true;
  		},
  		function(response){
  			$scope.usersMsg = "Error: " + response.status + " " + response.statusText;
  		});

  }]);