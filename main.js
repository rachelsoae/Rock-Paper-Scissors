// DATA MODEL
var computer = {
  name: 'Computer',
  token: '🤖',
  wins: 0
}

// VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
variationView = document.querySelector('.choose-fighter-variation');
fightResultView = document.querySelector('.fight-result-view');
button = document.querySelector('button');
gameBoxesContainer = document.querySelector('.game-boxes');
fighterContainer = document.querySelector('.icons');
userIcon = document.querySelector('.user-icon');
userName = document.querySelector('.user-name');
userWins = document.querySelector('.user-wins');
computerIcon = document.querySelector('.computer-icon');
computerName = document.querySelector('.computer-name');
computerWins = document.querySelector('.computer-wins');

// EVENT LISTENERS
window.addEventListener('load', function() {
  createPlayer('Player', '😄');
  displayPlayers(player, computer);
  displayWins(player, computer);
});

gameBoxesContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('classic')) {
    showClassicView();
  } else if (event.target.classList.contains('variation')) {
    showVariationView();
  }
});

button.addEventListener('click', chooseGame);

fighterContainer.addEventListener('click', function() {
    showFightResult();
  // invoke function that will save to data model and insert user's selection to HTML
})

// FUNCTIONS

function showClassicView() {
  show(classicView);
  show(button);
  hide(chooseGameView);
  hide(variationView);
  hide(fightResultView);
}

function showVariationView() {
  show(variationView);
  show(button);
  hide(chooseGameView);
  hide(classicView);
  hide(fightResultView);
}

function chooseGame() {
  show(chooseGameView);
  hide(button);
  hide(classicView);
  hide(variationView);
  hide(fightResultView);
}

function showFightResult() {
  show(fightResultView);
  show(button);
  hide(chooseGameView);
  hide(classicView);
  hide(variationView);
}

function createPlayer(name, token, wins = 0) {
  return player = {
    name: name,
    token: token,
    wins: wins
  }
}

function displayPlayers(player1, player2) {
  userIcon.innerText = player1.token;
  userName.innerText = player1.name;

  computerIcon.innerText = player2.token;
  computerName.innerText = player2.name;
}

function displayWins(player1, player2) {
  userWins.innerText = player1.wins;
  computerWins.innerText = player2.wins;
}

// HELPER FUNCTIONS

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}