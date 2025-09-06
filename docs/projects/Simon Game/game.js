let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Start game on any touch/click anywhere on screen
$(document).on('touchstart click', function(e) {
  if (!started) {
    e.preventDefault();
    $('#level-title').text('Level ' + 0);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function (e) {
  // Prevent this button click from starting the game
  e.stopPropagation();
  
  let userColorSelection = $(this).attr('id');
  userClickedPattern.push(userColorSelection);
  playSound(userColorSelection);
  animatedPress(userColorSelection);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  // Add new random color to the pattern
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Play the entire sequence from the beginning
  playSequence();
}

function playSequence() {
  let i = 0;
  let interval = setInterval(function () {
    let currentColor = gamePattern[i];
    // Animate and play sound for current color
    $('#' + currentColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(currentColor);
    i++;
    // Stop the interval when we've played all colors
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 600); // 600ms delay between each color in the sequence
}

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animatedPress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
