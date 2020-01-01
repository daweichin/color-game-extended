var colors = [];
var roundOver = false;

var correctColor = pickColor();
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");

var modeButtons = document.querySelectorAll(".mode");
var numSquares = 6;

// add-on variables

var scoreCorrect = document.getElementById("scoreCorrect");
var scoreIncorrect = document.getElementById("scoreIncorrect");
var percentageCorrect = document.getElementById("percentage");

colorDisplay.textContent = correctColor;

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  // mode buttons event listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);

      reset();
    });
  }
}

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squres
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.background;

      // test if selected color is correct
      if (clickedColor == correctColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        percentageCorrect.innerText = percentage();

        // adding counter if correct

        if (!roundOver) {
          var a = parseInt(scoreCorrect.textContent) + 1;
          scoreCorrect.textContent = a;
          roundOver = true;
        }
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again!";
        var b = parseInt(scoreIncorrect.textContent) + 1;
        scoreIncorrect.textContent = b;
        percentageCorrect.innerText = percentage();
      }
    });
  }
}

function reset() {
  // generate new colors
  colors = generateRandomColors(numSquares);
  // pick a new correct color
  correctColor = pickColor();
  //change display to match
  colorDisplay.textContent = correctColor;
  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }

  // resetting visuals and game logic
  roundOver = false;
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  // loop through squares and change to match given color
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(number) {
  // make an array
  var arr = [];
  // add number of random colors to arr
  for (var i = 0; i < number; i++) {
    // get a random color and push it into the array
    arr.push(randomColor());
  }
  // return array
  return arr;
}

function randomColor() {
  // pick a red, green, and blue
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function percentage() {
  // handle for division by 0
  if (parseInt(scoreIncorrect.textContent) === 0) {
    var percentage = 100;
    return percentage;
  }
  var percentage =
    parseInt(scoreCorrect.textContent) /
    (parseInt(scoreIncorrect.textContent) + parseInt(scoreCorrect.textContent));
  return percentage;
}
