const content = $('#content');
let currentState;
_isShuffling = false;

class State {
  constructor(arr, isInitialConstruction) {
    this._grid = arr;

    for (let i = 0; i < 16; i++) {
      // console.log(arr[i].className);
      if (arr[i].className == "empty-cell") {
        this._emptyIndex = i;
      }
    }
    if (this._emptyIndex == 15
      && !isInitialConstruction
      && !_isShuffling
      && this._isSolved()) {
        setTimeout(this._victoryAnimation, 100)

    } else {
      attachCellListeners();
    }
    this._setValidMoves();

  }

  _setValidMoves() {
    const moves = [];
    if (this._emptyIndex - 4 >= 0)
      moves.push(this._emptyIndex - 4);
    if (this._emptyIndex % 4 > 0)
      moves.push(this._emptyIndex - 1);
    if (this._emptyIndex % 4 < 3)
      moves.push(this._emptyIndex + 1);
    if (this._emptyIndex + 4 < 16)
      moves.push(this._emptyIndex + 4);
    this._validMoves = moves;
    // console.log(moves);
  }

  isValid(index) {
    for (let item in this._validMoves)
      if (this._validMoves[item] === index)
        return true;
    return false;
  }

  _isSolved() {
    for (let i = 0; i < 15; i++)
      if (this._grid[i].firstChild && this._grid[i].firstChild.innerHTML != i + 1)
        return false;
    return true;
  }

  shuffle(iterations) {
    _isShuffling = true;
    let prevMove;
    let move;
    for (let i = 0; i < iterations; i++) {
      (function (ms) {
        setTimeout(function () {
          console.log("move = " + move + " and " + "prevMove = " + prevMove);
          while (move == prevMove) {
            move = currentState._validMoves[Math.floor(Math.random() * currentState._validMoves.length)];
          }
          prevMove = move;
          currentState = currentState.makeMove(move);
        }, ms * 150);
      })(i);
    }
    setTimeout(() => _isShuffling = false, iterations * 150 + 50);
  }

  _victoryAnimation() {
    alert('congratulations! Play again?');
    console.log(this);
    currentState.shuffle(60);
  }

  makeMove(index) {
    const nextGrid = this._grid.slice();
    swap(nextGrid, index, this._emptyIndex);
    // console.log(nextGrid);
    content.empty();
    content.append(nextGrid);

    return new State(nextGrid);
  }

}

swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


attachCellListeners = () => {
  const cell = $('.cell');
  let index;
  cell.on ({
    click: function () {
      index = $(this).index();
      console.log("index in cell click handler is: " + index);

      if (currentState.isValid(index)) {
        console.log("hi");
        currentState = currentState.makeMove(index);
      }
    },
    mouseenter: function () {
      index = $(this).index();
      if (currentState.isValid(index)) {
        $(this).css("border-color", "grey");
      }
    },
    mouseleave: function () {
      index = $(this).index();
      if (currentState.isValid(index)) {
        $(this).css("border-color", "white");
      }
    }
  });
}

init = () => {
  for (let i = 0; i < 15; i++) {
    content.append(`<div class="cell"><span>${i+1}</span></div>`);
  }
  content.append('<div class="empty-cell"></div>');

  currentState = new State(content.children(), true);
  currentState.shuffle(50);
  $('.cell').css("background-color", "red");
}

$(document).ready(init);
