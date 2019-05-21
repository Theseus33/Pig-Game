/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//dice logic
dice = Math.floor(Math.random() * 6) + 1;

//document object gives us access to the DOM
//querySelector lets us acess the first lement of its name like css does
//selecting element that lists score
//will now show the value of the random dice roll

//this is called a 'setter' becauce it sets a value
document.querySelector('#current-' + activePlayer).textContent = dice;
//to change hte html we would need to use innerHTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//to read the value or content of the element with the id score-0 and store it to variable x
//this is called a getter because it retrieves a value
var x = document.querySelector('#score-0').textContent;
console.log(x);

//can also use the querySelector to change the CSS of an object
//hide the dice image
document.querySelector('.dice').style.display = 'none';
