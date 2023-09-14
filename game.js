const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 1;
let userClickPerLevel = 0;

function playAudio(selectedColour) {
  var audio = new Audio("./sounds/" + selectedColour + ".mp3");
  audio.play();
}

function buttonAnimation(selectedColour) {
  $("#" + selectedColour + "")
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

$(document).keydown(function (event) {
  if (event.key === "a") {
    nextSequence();
  }
});

function nextSequence() {
  $("#level-title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  setTimeout(() => {
    playSequence(0);
  }, 500);
}

function playSequence(index) {
  if (index < gamePattern.length) {
    setTimeout(() => {
      playAudio(gamePattern[index]);
      buttonAnimation(gamePattern[index]);

      setTimeout(() => {
        playSequence(index + 1);
      }, 350);
    }, 350);
  }
}

$(".btn").on("click", function () {
  userClickPerLevel++;
  let selectedColour = this.id;
  playAudio(selectedColour);
  buttonAnimation(selectedColour);
  checkAnswer(selectedColour);
});

function resetGame() {
  gamePattern = [];
  userClickPerLevel = 0;
  level = 0;
}

function gameOver() {
  $("body").addClass(".game-over");
  $("#level-title").html("Game Over, Press A to start again");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 1000);
}

function checkAnswer(selectedColour) {
  if (gamePattern[userClickPerLevel - 1] != selectedColour) {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    gameOver();
    resetGame();
  }

  if (userClickPerLevel == level - 1) {
    userClickPerLevel = 0;
    nextSequence();
  }
}
