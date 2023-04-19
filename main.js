// DATA MODEL
var players = [];

// VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
variationView = document.querySelector('.choose-fighter-variation');
fightResultView = document.querySelector('.fight-result-view');
button = document.querySelector('button');
gameBoxesContainer = document.querySelector('.game-boxes');
fighterContainer = document.querySelector('.icons');
player1Icon = document.querySelector('.player1-icon');
player1Name = document.querySelector('.player1-name');
player1Wins = document.querySelector('.player1-wins');
player2Icon = document.querySelector('.player2-icon');
player2Name = document.querySelector('.player2-name');
player2Wins = document.querySelector('.player2-wins');

// EVENT LISTENERS
window.addEventListener('load', function() {
  var user = createPlayer('Player', '😄');
  var computer = createPlayer('Computer', '🤖')
  displayPlayers(user, computer);
  displayWins(user, computer);
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

function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins
  }
  players.push(player);
  return player;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

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

function displayPlayers(player1, player2) {
  player1Icon.innerText = player1.token;
  player1Name.innerText = player1.name;

  player2Icon.innerText = player2.token;
  player2Name.innerText = player2.name;
}

function displayWins(player1, player2) {
  player1Wins.innerText = player1.wins;
  player2Wins.innerText = player2.wins;
}

