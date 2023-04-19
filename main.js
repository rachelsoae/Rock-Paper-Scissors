// VARIABLES
chooseGameView = document.querySelector('.choose-game-view');
chooseFighterClassicView = document.querySelector('.choose-fighter-classic');
chooseFighterVariationView = document.querySelector('.choose-fighter-variation');
fightResultView = document.querySelector('.fight-result');
button = document.querySelector('button');
gameBoxesContainer = document.querySelector('.game-boxes');

// EVENT LISTENERS
gameBoxesContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('classic')) {
    showClassicView();
  } else if (event.target.classList.contains('variation')) {
    showVariationView();
  }
});

// FUNCTIONS

function showClassicView() {
  show(chooseFighterClassicView);
  show(button);
  hide(chooseGameView);
  hide(chooseFighterVariationView);
  hide(fightResultView);
}

function showVariationView() {
  show(chooseFighterVariationView);
  show(button);
  hide(chooseGameView);
  hide(chooseFighterClassicView);
  hide(fightResultView);
}

// HELPER FUNCTIONS

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}