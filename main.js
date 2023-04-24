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
loginButton = document.querySelector('.login-button');
nameInput = document.querySelector('input');
iconInput = document.querySelector('select');
winLabels = document.querySelectorAll('.wins-label');
loginView = document.querySelector('form')
player1Icon = document.querySelector('.player1-icon');
player1Name = document.querySelector('.player1-name');
player1Wins = document.querySelector('.player1-wins');
player2Icon = document.querySelector('.player2-icon');
player2Name = document.querySelector('.player2-name');
player2Wins = document.querySelector('.player2-wins');
classicGameButton = document.querySelector('.classic-game-button');
wizardGameButton = document.querySelector('.wizard-game-button');
classicResetButton = document.querySelector('.classic-reset-button');
wizardResetButton = document.querySelector('.wizard-reset-button');
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
classicBox = document.querySelector('.classic-box');
wizardBox = document.querySelector('.wizard-box');
wizardView = document.querySelector('.choose-fighter-wizard');
fighterSection = document.querySelector('.fighters');
resultView = document.querySelector('.result-view');
classicFighterContainer = document.querySelector('.classic-icons');
wizardFighterContainer = document.querySelector('.wizard-icons')
result = document.querySelector('.result');


// EVENT LISTENERS

loginButton.addEventListener('click', function() {
  user = createPlayer(`${nameInput.value}`, `${iconInput.value}`);
  computer = createPlayer('Computer', '🤖')
  login();
});

classicBox.addEventListener('click', function() {
  game = createGame('classic', user, computer);
  displayGame(game);
});

wizardBox.addEventListener('click', function() {
  game = createGame('wizard', user, computer);
  displayGame(game);
});

classicFighterContainer.addEventListener('click', function(event) { 
  updateFighters(game, event.target);
});

wizardFighterContainer.addEventListener('click', function(event) { 
  updateFighters(game, event.target);
});

classicResetButton.addEventListener('click', function() {
  resetWins(user, computer);
});

wizardResetButton.addEventListener('click', function() {
  resetWins(user, computer);
});

classicGameButton.addEventListener('click', displayChooseGameView);
wizardGameButton.addEventListener('click', displayChooseGameView);

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
  
  if ((fighter2 === fighterOptions[fighter1]) || (fighter2 === fighterOptions[fighter1][0]) || (fighter2 === fighterOptions[fighter1][1])) {
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

function resetWins(player1, player2) {
  player1.wins = 0;
  player2.wins = 0;
  displayWins(player1, player2);
}

function displayResetButton(player1, player2) {
  if (player1.wins && player2.wins) {
    show(classicResetButton);
    show(wizardResetButton);
  } else {
    hide(classicResetButton);
    hide(wizardResetButton);
  }
}

// FUNCTIONS - DOM
function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function login() {
  displayPlayers(user, computer);
  displayWins(user, computer);
  displayChooseGameView();
}

function displayPlayers(player1, player2) {
  player1Icon.innerText = player1.token;
  player1Name.innerText = player1.name;

  player2Icon.innerText = player2.token;
  player2Name.innerText = player2.name;
};

function displayWins(player1, player2) {
  for (var i = 0; i < winLabels.length; i++) {
    show(winLabels[i]);
  }

  player1Wins.innerText = player1.wins;
  player2Wins.innerText = player2.wins;
};

function displayGame(game) {
  if (game.type === 'classic') {
    displayClassicView();
  } else {
    displayVariationView();
  };
};

function displayClassicView() {
  show(classicView);
  show(classicGameButton);
  show(classicResetButton);
  hide(wizardGameButton);
  hide(chooseGameView);
  hide(wizardView);
  hide(resultView);
  hide(loginView);
};

function displayVariationView() {
  show(wizardView);
  show(wizardGameButton);
  show(wizardResetButton);
  hide(classicGameButton);
  hide(chooseGameView);
  hide(classicView);
  hide(resultView);
  hide(loginView);
};

function displayChooseGameView() {
  show(chooseGameView);
  hide(classicGameButton);
  hide(wizardGameButton);
  hide(classicResetButton);
  hide(wizardResetButton);
  hide(classicView);
  hide(wizardView);
  hide(resultView);
  hide(loginView);
};

function displayResult(game) {
  show(resultView);
  hide(chooseGameView);
  hide(classicView);
  hide(wizardView);
  hide(loginView);
  displayFighter(fighter1);
  displayFighter(fighter2); 
  setTimeout(reset, 1250, game);
};

function displayFighter(fighter) {
  switch (fighter) {
    case 'rock':
      fighterSection.innerHTML += `<img src="assets/happy-rocks.png" alt="a cartoon big and small rock sitting in a tuft of grass with happy smiling faces">`;
      break;
    case 'paper':
      fighterSection.innerHTML += `<img src="assets/happy-paper.png" alt="a cartoon lined piece of paper with a happy smiling face">`;
      break;
    case 'scissors':
      fighterSection.innerHTML += `<img src="assets/happy-scissors.png" alt="a pair of cartoon scissors">`;
      break;
    case 'harry':
      fighterSection.innerHTML += `<img src="assets/harry.png" alt="cartoon of Harry Potter">`;
      break;
    case 'malfoy':
      fighterSection.innerHTML += `<img src="assets/malfoy.png" alt="cartoon of Draco Malfoy">`;
      break;
    case 'snape':
      fighterSection.innerHTML += `<img src="assets/snape.png" alt="cartoon of Severus Snape">`;
      break;
    case 'voldemort':
      fighterSection.innerHTML += `<img src="assets/voldemort.png" alt="cartoon of Lord Voldemort">`;
      break;
    case 'dumbledore':
      fighterSection.innerHTML += `<img src="assets/dumbledore.png" alt="cartoon of Albus Dumbledore">`;
      break;
  };
};

function announceDraw() {
  result.innerText = `🤝 It's a draw! 🤝`;
};

function announceWinner(player) {
  result.innerText = `${player.token} ${player.name} wins this round! ${player.token}`;
  displayWins(user, computer);
};

function reset(game) {
  fighterSection.innerHTML = '';
  displayGame(game);
};
