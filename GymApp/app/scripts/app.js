'use strict';

/**
 * @ngdoc overview
 * @name gymApp
 * @description
 * # gymApp
 *
 * Main module of the application.
 */
angular
  .module('gymApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/excercises', {
        templateUrl: 'views/excercises.html',
        controller: 'ExcersicesCtrl',
        controllerAs: 'excercises'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
