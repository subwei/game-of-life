'use strict';

// Controllers
var gameApp = angular.module('gameOfLife', []);

gameApp.controller('GameCtrl', function($scope, $timeout) {
  $scope.grid = [];
  $scope.width = 100;
  $scope.height = 50;
  $scope.state = false;
  $scope.isDisabled = true;

  $scope.foo = function(row, index) {
  	if (row[index] == 1) {
  		row[index] = 0;
  	} else {
		  row[index] = 1;
  	}
  };

  var tick = function() {
  	game.runGame($scope.grid);
    if ($scope.state) {
      $timeout(tick, 400);      
    }
  };

  $scope.init = function() {
    $scope.grid = game.generateGrid($scope.width, $scope.height);
    $scope.isDisabled = false;
  };

  $scope.start = function() {
    if ($scope.grid.length === 0 || $scope.state) {
      return;
    }
    $scope.state = true;
  	tick();
  };

  $scope.stop = function() {
    $scope.state = false;
  }
});