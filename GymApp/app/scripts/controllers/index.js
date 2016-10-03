'use strict';

/**
 * @ngdoc function
 * @name gymApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the gymApp
 */
angular.module('gymApp')
  .controller('IndexCtrl', ['$scope', function ($scope) {

  	$scope.showError = false;
  	$scope.ErrorMsg = '-';

  	$scope.loginInfo = {
  		email : '',
  		password : '',
  		rememberMe: false
  	};

  	$scope.submitLogin = function(){
      window.alert('pase por aqui');
  		var msg = '';
  		if($scope.loginInfo.email === '')
  		{
  			msg += '\n Debe ingresar su email';
  		}
  		if ($scope.loginInfo.password === '')
  		{
  			msg += '\n Debe ingresar su contraseña';
  		}
  		if (msg !== '')
  		{
  			$scope.showError = true;
  			$scope.ErrorMsg = msg;
  		}

  	};

  }]);