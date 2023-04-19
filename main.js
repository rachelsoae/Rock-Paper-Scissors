// DATA MODEL
var user;
var computer;
var game;

// DOM VARIABLES
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
result = document.querySelector('.result');

// EVENT LISTENERS
window.addEventListener('load', function() {
  user = createPlayer('Player', '😄');
  computer = createPlayer('Computer', '🤖')
  displayPlayers(user, computer);
  displayWins(user, computer);
});

gameBoxesContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('classic')) {
    game = createGame('classic', user, computer);
  } else if (event.target.classList.contains('variation')) {
    game = createGame('variation', user, computer);
  }

  displayGame(game);
});

button.addEventListener('click', chooseGame);

fighterContainer.addEventListener('click', function(event) { 
  playGame(game, event.target, user, computer);
});

// FUNCTIONS
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

function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins
  }
  return player;
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

function createGame(type, player1, player2) {
    game = {
      type: type,
      players: [player1, player2]
    }   
    return game;
}

function displayGame(game) {
  if (game.type === 'classic') {
    showClassicView();
  } else {
    showVariationView();
  }
}

function playGame(game, userSelection, player1, player2) {
  game.players[0].fighter = userSelection.className;
  game.players[1].fighter = getComputerFighter(game);
  var fighter1 = game.players[0].fighter;
  var fighter2 = game.players[1].fighter;
  var winner;
  

  if ((fighter1 === 'rock' && fighter2 === 'scissors') || (fighter1 === 'paper' && fighter2 === 'rock') || (fighter1 === 'scissors' && fighter2 === 'paper')) {
    winner = player1;
    winner.wins += 1;
    showFightResult();
    result.innerText = 'Player has won!'
    displayWins(player1, player2);
  } else if ((fighter2 === 'rock' && fighter1 === 'scissors') || (fighter2 === 'paper' && fighter1 === 'rock') || (fighter2 === 'scissors' && fighter1 === 'paper')) {
    winner = player2;
    winner.wins += 1;
    showFightResult();
    result.innerText = 'Computer has won!'
    displayWins(player1, player2);
  } else {
    drawGame(player1, player2);
  }
}

function getComputerFighter(game) {
  if (game.type === 'classic') {
    var options = ['rock', 'paper', 'scissors'];
    var index = Math.floor(Math.random() * 3);
    var fighter = options[index];
    return fighter;
  }
}

function drawGame() {
  showFightResult();
  result.innerText = `It's a draw!`;
}
