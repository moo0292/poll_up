'use strict';

/**
 * @ngdoc function
 * @name pollUpApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pollUpApp
 */
angular.module('pollUpApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
