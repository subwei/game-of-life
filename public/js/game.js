'use strict';

var game = (function(){
var generate = function(width, height) {
  var grid = [];
  for (var i = 0; i < height; i++) {
    var column = [];
    for (var y = 0; y < width; y++) {
      var value = Math.floor(Math.random() * 4);
      if (value === 1 || value === 2) {
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

var run = function(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (shouldBeLive(grid[i][j], getNumLiveNeighbors(grid, i, j))) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }
}

return {runGame: run, generateGrid: generate};
}());