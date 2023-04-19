// VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
classicView = document.querySelector('.choose-fighter-classic');
variationView = document.querySelector('.choose-fighter-variation');
fightResultView = document.querySelector('.fight-result-view');
button = document.querySelector('button');
gameBoxesContainer = document.querySelector('.game-boxes');
fighterContainer = document.querySelector('.icons');

// EVENT LISTENERS
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

// HELPER FUNCTIONS

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}