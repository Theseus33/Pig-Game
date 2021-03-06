/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//dice logic
//dice = Math.floor(Math.random() * 6) + 1;

//document object gives us access to the DOM
//querySelector lets us acess the first lement of its name like css does
//selecting element that lists score
//will now show the value of the random dice roll

//this is called a 'setter' becauce it sets a value
//document.querySelector('#current-' + activePlayer).textContent = dice;
//to change hte html we would need to use innerHTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//to read the value or content of the element with the id score-0 and store it to variable x
//this is called a getter because it retrieves a value
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//can also use the querySelector to change the CSS of an object
//hide the dice image (moved to init function for DRY)
//document.querySelector('.dice').style.display = 'none';

/**
 * Events: notifications that are sent to notify the code that something happened on the webpage;
 * Examples: clicking a button, resizing a window, scrolling down, or pressing a key.
 * 
 * Event Listener: a function that performs an action based on a certain event. It waits for a specific event to happen.
 * 
 * An event can only be processed or handled as soon as the execution stack is empty. This means that all the functions have returned.
 * The message queue is where all the events that happened on the browser are put, they sit there waiting to be processed ( click/scroll event).
 * 
 * An event handler gets its own execution context  which is placed on top of the stack and becomes the active execution context.
 */

//addEventListener has two arguments first: event type second: function called as soon as event happens

//function btn() {
//do something here
//}

//btn();

//btn under addEventListener is considered a callback function
//function that is not called by us but by another function
//or a function that we pass into another function as an argument

//an anonymous function is a function that does not have a name so it can only be called under that event that called it seen below.
//moved to init() for DRY
//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-0').textContent = '0';

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //.3. Update the round score IF the rolled number is NOT a 1.
    if (dice !== 1) {
      //Add Score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player when someone rolls a 1    
      nextPlayer();
    }
  }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
  //Add current score to GLOBAL score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      //not the best way to hide the dice, better would be to make an active class and toggle it
      document.querySelector('.dice').style.display = 'none';
      //removing the active player
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //next player functionality
      nextPlayer();
    }
  }

});

//DRY principle = implemnt a function to make it scalable/changable 
//doesnt recieve params doesnt return anything just checks to call next player
//replacing the code portion above as well as further higher above.
function nextPlayer() {
  //Next player   
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  //show zero in UI
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //when player switches change active classs to highlight current player in the UI
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  //toggle does this better removing the active class if there and vice versa
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}
//when new game button is pressed       
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
