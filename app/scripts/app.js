'use strict';

/**
 * @ngdoc overview
 * @name pollUpApp
 * @description
 * # pollUpApp
 *
 * Main module of the application.
 */
angular
  .module('pollUpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angles',
    'tc.chartjs',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
