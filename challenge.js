/* 3 Challenges
Change the game to follow these rules:

1. A player loses this ENTIRE score when they roll two 6's in a row. After that, 
it's the next player's turn. (Hint: Always save the previous dice roll in a seperate
variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change 
the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript.)
3. Add another dice to the game, so there are two die now. The player loses his current score when one of them
is a 1. (Hint: need CSS to position the second die, so take a look at hte CSS code for the first one)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //.3. Update the round score IF the rolled number is NOT a 1.
    if (dice === 6 && lastDice === 6) {
      //player loses score
      scores[activePlayer] = 0;
      //update DOM to show 0
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //Add Score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player when someone rolls a 1
      nextPlayer();
    }
    //to store last dice value
    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //Add current score to GLOBAL score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      //not the best way to hide the dice, better would be to make an active class and toggle it
      document.querySelector(".dice").style.display = "none";
      //removing the active player
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
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
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  //show zero in UI
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //when player switches change active classs to highlight current player in the UI
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  //toggle does this better removing the active class if there and vice versa
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}
//when new game button is pressed
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
