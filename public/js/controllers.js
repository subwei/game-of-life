'use strict';

/* Controllers */

var gameApp = angular.module('gameOfLife', []);

gameApp.controller('GameCtrl', function($scope, $timeout) {
  $scope.grid = [
  	[1, 0, 1, 0],
  	[1, 1, 0, 1],
  	[1, 0, 1, 0],
  	[1, 1, 0, 1],
  ];
  $scope.debug = {
  	text: 'hi'
  }
  $scope.foo = function(row, index) {
  	if (row[index] == 1) {
  		row[index] = 0;
  	} else {
		row[index] = 1;
  	}
  };
  $scope.counter = 0;

  var generateGrid = function(width, height) {
  	var grid = [];
  	for (var i = 0; i < height; i++) {
  		var column = [];
  		for (var y = 0; y < width; y++) {
  			var value = Math.floor(Math.random() * 4);
  			if (value === 1) {
				column.push(1);
  			} else {
  				column.push(0);
  			}
  		}
  		grid.push(column);
  	}
  	return grid;
  }

  var getNumLiveNeighbors = function(grid, x, y) {
  	var numLiveNeighbors = 0;
  	for (var i = x - 1; i <= x + 1; i++) {
  		for (var j = y - 1; j <= y + 1; j++) {
  			if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
  				continue;
  			}
  			if (i === x && j === y) {
  				continue;
  			}
  			if (grid[i][j] === 1) {
  				numLiveNeighbors++
  			}
  		}
  	}
  	return numLiveNeighbors
  }

  var shouldBeLive = function(currentState, numLiveNeighbors) {
  	if (currentState === 1 && (numLiveNeighbors === 2 || numLiveNeighbors === 3)) {
  		return true;
  	}
  	if (currentState === 0 && numLiveNeighbors === 3) {
  		return true;
  	}
  	return false;
  }

  var runGame = function() {
  	for (var i = 0; i < $scope.grid.length; i++) {
  		for (var j = 0; j < $scope.grid[i].length; j++) {
  			var numLiveNeighbors = getNumLiveNeighbors($scope.grid, i, j);
  			$scope.counter++;
  			$scope.debug.text = numLiveNeighbors;
  			if (shouldBeLive($scope.grid[i][j], numLiveNeighbors)) {
  				$scope.grid[i][j] = 1;
  			} else {
  				$scope.grid[i][j] = 0;
  			}
  		}
  	}
  }

  var tick = function() {
  	runGame();
  	$scope.counter++;
  	$timeout(tick, 250);
  };

  $scope.start = function() {
  	$scope.grid = generateGrid(90, 80);
  	tick();
  };
});
