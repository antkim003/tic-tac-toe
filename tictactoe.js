// global variables

var turnCounter = 1,
winner = false, gameover = false;

var defaults = {
  width: 3,
  height: 3,
  // interval: 0
};

var winningPatterns = [
  // vertical patterns
  [1,4,7],
  [2,5,8],
  [3,6,9],
  // horizontal patterns
  [7,8,9],
  [4,5,6],
  [1,2,3],
  // crisscross patterns
  [1,5,9],
  [3,5,7]
];

// grid generator

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.id = environment;
  this.el = environment;
  this.buildTable();
}

Grid.prototype.buildTable = function() {
  var cellNumber = 0;
  for (var i = this.width-1; i >= 0; i--) {
    var tr = this.el.insertRow();
    for (var j = this.height-1; j >= 0; j--) {
      var td = tr.insertCell();
      cellNumber++;
      td.id = cellNumber;
      td.className = "cell";
    }
  }
};

// x always goes first
function cellPopulator(target) {
  var currentElement = target;
  if (!gameover) {  
    if (currentElement.html() == "") {
      if (turnCounter % 2 == 1) {
        currentElement.addClass("x");
        currentElement.html("X");
        turnCounter ++;
      } else {
        currentElement.addClass("o");
        currentElement.html("O");
        turnCounter ++;

      }    
    }
  }
  if (turnCounter >= 5) {
    if (checkForWinners()) {
      $(".message").html("Winner is " + winningPlayer + "!!!!").fadeIn(500);
    } else if (turnCounter >= 10) {
      $(".message").html("GAMEOVER! There is no winner! Try Again!").fadeIn(500);
    }
  }
}

function checkForWinners() {
  var players = ["x", "o"];
  for (var i = 0; i < players.length; i++) {
    if ($("#1").hasClass(players[i]) &&
        $("#2").hasClass(players[i]) &&
        $("#3").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#4").hasClass(players[i]) &&
        $("#5").hasClass(players[i]) &&
        $("#6").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#7").hasClass(players[i]) &&
        $("#8").hasClass(players[i]) &&
        $("#9").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#1").hasClass(players[i]) &&
        $("#4").hasClass(players[i]) &&
        $("#7").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#2").hasClass(players[i]) &&
        $("#5").hasClass(players[i]) &&
        $("#8").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#3").hasClass(players[i]) &&
        $("#6").hasClass(players[i]) &&
        $("#9").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#1").hasClass(players[i]) &&
        $("#5").hasClass(players[i]) &&
        $("#9").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }
    if ($("#3").hasClass(players[i]) &&
        $("#5").hasClass(players[i]) &&
        $("#7").hasClass(players[i])) {
      winningPlayer = players[i];
      gameover = true;
      return true;
    }   
  };
}

function restart() {
  var cells = $(".cell");
  for (var i = 0; i < cells.length; i++) {
    $(cells[i]).removeClass("x");
    $(cells[i]).removeClass("o");
    $(cells[i]).html("");
    $(".message").html("").hide();
    turnCounter = 1;
  };
}

var initiator = new Grid(defaults.width, defaults.height);

$(document).ready(function() {
  $("body").on("click",".cell", function() {
    cellPopulator($(this));
  });
  $("body").on("click",".restart", function() {
    restart();
  });
});