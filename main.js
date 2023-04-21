// DATA MODEL
var user;
var computer;
var game;
var fighter1;
var fighter2;
var fighterOptions = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
  harry: ['voldemort', 'malfoy'],
  malfoy: ['dumbledore', 'snape'],
  snape: ['dumbledore', 'harry'],
  voldemort: ['snape', 'malfoy'],
  dumbledore: ['harry', 'voldemort']
};

// DOM VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
variationView = document.querySelector('.choose-fighter-variation');
resultView = document.querySelector('.result-view');
button = document.querySelector('button');
gameBoxesContainer = document.querySelector('.game-boxes');
classicFighterContainer = document.querySelector('.classic-icons');
variationFighterContainer = document.querySelector('.variation-icons')
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

classicFighterContainer.addEventListener('click', function(event) { 
  updateFighters(game, event.target);
});

variationFighterContainer.addEventListener('click', function(event) { 
  updateFighters(game, event.target);
});

// FUNCTIONS - DATA MODEL
function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins
  };
  return player;
};

function createGame(type, player1, player2) {
  game = {
    type: type,
    players: [player1, player2]
  };
  return game;
};

function getComputerFighter(game) {
  var fighters = Object.keys(fighterOptions);

  if (game.type === 'classic') {
    var index = Math.floor(Math.random() * 3);
  } else {
    var index = ((Math.floor(Math.random() * 5)) + 3);
  };

  var fighter = fighters[index];
  return fighter;
};

function updateFighters(game, userSelection) {
  game.players[0].fighter = userSelection.id;
  game.players[1].fighter = getComputerFighter(game);
  fighter1 = game.players[0].fighter;
  fighter2 = game.players[1].fighter;
  detectDraw(game); 
  return game;
}

function detectDraw(game) {
  if (fighter1 === fighter2) {
    announceDraw();
  } else {
    determineWinner(game);
  };

  displayResult(game); 
  return game;
};

function determineWinner(game) {
  var winner;
  
  if ((fighter2 === fighterOptions[fighter1][0]) || (fighter2 === fighterOptions[fighter1][1])) {
    winner = game.players[0]; 
  } else {
    winner = game.players[1];
  };

  winFight(winner);
  announceWinner(winner);
  return game;
};

function winFight(player) {
  player.wins += 1;
  return player;
}

// FUNCTIONS - DOM
function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
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

function displayGame(game) {
  if (game.type === 'classic') {
    displayClassicView();
  } else {
    displayVariationView();
  };
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
    case 'harry':
      fighterSection.innerHTML += `<img src="assets/harry.png" alt="cartoon of Harry Potter" class="wizard" id="harry">`;
      break;
    case 'malfoy':
      fighterSection.innerHTML += `<img src="assets/malfoy.png" alt="cartoon of Draco Malfoy" class="wizard" id="malfoy">`;
      break;
    case 'snape':
      fighterSection.innerHTML += `<img src="assets/snape.png" alt="cartoon of Severus Snape" class="wizard" id="snape">`;
      break;
    case 'voldemort':
      fighterSection.innerHTML += `<img src="assets/voldemort.png" alt="cartoon of Lord Voldemort" class="wizard" id="voldemort">`;
      break;
    case 'dumbledore':
      fighterSection.innerHTML += `<img src="assets/dumbledore.png" alt="cartoon of Albus Dumbledore" class="wizard" id="dumbledore">`;
      break;
  };
};

function announceDraw() {
  result.innerText = `It's a draw!`;
};

function announceWinner(player) {
  result.innerText = `${player.name} wins this round!`;
  displayWins(user, computer);
};

function reset(game) {
  fighterSection.innerHTML = '';
  displayGame(game);
};
