// DATA MODEL
var user;
var computer;
var game;
var fighter1;
var fighter2;

// DOM VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
variationView = document.querySelector('.choose-fighter-variation');
resultView = document.querySelector('.result-view');
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
fighterSection = document.querySelector('.fighters');
rockImg = document.querySelector('.rock');
paperImg = document.querySelector('.paper');
scissorsImg = document.querySelector('.scissors');

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

button.addEventListener('click', displayChooseGameView);

fighterContainer.addEventListener('click', function(event) { 
  updateFighters(game, event.target);
});

// FUNCTIONS - DATA MODEL
function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins
  }
  return player;
};

function createGame(type, player1, player2) {
  game = {
    type: type,
    players: [player1, player2]
  }   
  return game;
};

function winFight(player) {
  player.wins += 1;
  return player;
}

function getComputerFighter(game) {
  if (game.type === 'classic') {
    var options = ['rock', 'paper', 'scissors'];
    var index = Math.floor(Math.random() * 3);
    var fighter = options[index];
    return fighter;
  }
};

function updateFighters(game, userSelection) {
  game.players[0].fighter = userSelection.className;
  game.players[1].fighter = getComputerFighter(game);
  fighter1 = game.players[0].fighter;
  fighter2 = game.players[1].fighter;

  if (fighter1 === fighter2) {
    announceDraw();
  } else {
    determineWinner(game);
  }

  displayResult(game); 
  
  return game;
};

function determineWinner(game) {
  var winner;

  if ((fighter1 === 'rock' && fighter2 === 'scissors') || (fighter1 === 'paper' && fighter2 === 'rock') || (fighter1 === 'scissors' && fighter2 === 'paper')) {
    winner = game.players[0]; 
  } else {
    winner = game.players[1];
  }

  winFight(winner);
  announceWinner(winner);
  return game;
};

// FUNCTIONS - DOM
function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function displayClassicView() {
  show(classicView);
  show(button);
  hide(chooseGameView);
  hide(variationView);
  hide(resultView);
};

function displayVariationView() {
  show(variationView);
  show(button);
  hide(chooseGameView);
  hide(classicView);
  hide(resultView);
};

function displayChooseGameView() {
  show(chooseGameView);
  hide(button);
  hide(classicView);
  hide(variationView);
  hide(resultView);
};

function displayResult(game) {
  show(resultView);
  show(button);
  hide(chooseGameView);
  hide(classicView);
  hide(variationView);
  displayFighter(fighter1);
  displayFighter(fighter2); 
  setTimeout(reset, 1250, game);
};

function displayPlayers(player1, player2) {
  player1Icon.innerText = player1.token;
  player1Name.innerText = player1.name;

  player2Icon.innerText = player2.token;
  player2Name.innerText = player2.name;
};

function displayWins(player1, player2) {
  player1Wins.innerText = player1.wins;
  player2Wins.innerText = player2.wins;
};

function displayGame(game) {
  if (game.type === 'classic') {
    displayClassicView();
  } else {
    displayVariationView();
  }
};

function displayFighter(fighter) {
  switch (fighter) {
    case 'rock':
      fighterSection.innerHTML += `<img src="assets/happy-rocks.png" alt="a big and small rock sitting in a tuft of grass with happy smiling faces" class="rock">`;
      break;
    case 'paper':
      fighterSection.innerHTML += `<img src="assets/happy-paper.png" alt="a lined piece of paper with a happy smiling face" class="paper">`;
      break;
    case 'scissors':
      fighterSection.innerHTML += `<img src="assets/happy-scissors.png" alt="a pair of scissors" class="scissors">`;
      break;
  };
};

function announceWinner(player) {
  result.innerText = `${player.name} won this round!`
  displayWins(user, computer);
}

function announceDraw() {
  result.innerText = `It's a draw!`;
};

function reset(game) {
  fighterSection.innerHTML = '';
  if (game.type = 'classic') {
    displayClassicView();
  } else {
    displayVariationView();
  }
};
