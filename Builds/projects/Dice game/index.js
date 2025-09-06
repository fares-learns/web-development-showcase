/** @format */
let score1 = 0;
let score2 = 0;

function roll() {
  let randomNumber1 = Math.floor(Math.random() * 6) + 1;
  document
    .querySelector('.img1')
    .setAttribute('src', './images/dice' + randomNumber1 + '.png');

  let randomNumber2 = Math.floor(Math.random() * 6) + 1;
  document
    .querySelector('.img2')
    .setAttribute('src', './images/dice' + randomNumber2 + '.png');

  if (randomNumber1 > randomNumber2) {
    document.querySelector('h1').textContent = 'Player 1 Wins!';
    score1++;
  } else if (randomNumber2 > randomNumber1) {
    document.querySelector('h1').textContent = 'Player 2 Wins!';
    score2++;
  } else {
    document.querySelector('h1').textContent = 'Draw!';
  }
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.querySelector('#score').innerHTML = `
    <button class='btn Refresh'>Roll</button>
    <h3 class="text">Player 1: ${score1} and Player 2: ${score2}</h3>
  `;

  document.querySelector('.Refresh').addEventListener('click', roll);
}

updateScoreDisplay();
