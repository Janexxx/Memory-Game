/*
 * Create a list that holds all of your cards
 */
const cardSymbol = ['fa-bicycle', 'fa-bicycle', 
 				'fa-leaf', 'fa-leaf', 
 				'fa-cube', 'fa-cube',
 				'fa-anchor', 'fa-anchor', 
				'fa-paper-plane-o', 'fa-paper-plane-o', 
				'fa-bolt', 'fa-bolt',
				'fa-bomb', 'fa-bomb', 
				'fa-diamond', 'fa-diamond'
 				]
// Create a empty array to store the open card.
// Initialize the match cards and the number of moves. 
openCards = [];
matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Ramdomizes cards and updates card on HTML.
function initGame(){
	let card = $('.card');
	card.removeClass('match open show');

	let newCardSymbol = shuffle(cardSymbol);
	for(let i = 0; i < cardSymbol.length; i++){
		$('.deck').append('<li class="card"><i class="fa ' + cardSymbol[i] + '"></i></li>');
	}
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Open and show the selected card.
function showSymbol(card){
	card.addClass('open show');
};

// Hide the selected card.
function hideSymbol(card){
	card.removeClass('open show');
};

// Keep the matched cards.
function keepOpenOfMatch(card){
	card.addClass('match');
	card.removeClass('open show');
};

//.attr()get the value of 'class' attribute. But why split? --> in order to easily compare
// Add the open card to openCards array. 
function addToOpen(card){
	const cardPic = card.children('i').attr('class').split(' ')[1];
	openCards.push(cardPic);
};

// The message will be shown when player win the game. 
function showWinMessage(){

};

// To check if the two cards in openCards array are same or not. 
function checkMatch(){
	if(openCards.length === 2){ // Check if match when two cards are stored in the openCards array.
		if (openCards[0] == openCards[1]){ // If they are matched
			keepOpenOfMatch($('.card:has(.'+openCards[0]+')')); //???
			matchedCards.push(openCards[0]);
			if(matchedCards.lengh == 8){ // The game is won and finish.
				showWinMessage();
			}
		}
		else{ // The two cards are not matched. So hide the two cards. 
			hideSymbol($('.card:has(.'+openCards[0]+')'));
			hideSymbol($('.card:has(.'+openCards[1]+')'));
		}
		openCards = [];
	}
};


$(document).ready(function(){
	$('.card').on('click', function(event){
		let card = $(event.target);

		if(openCards.length <= 1){
			showSymbol(card);
			addToOpen(card);
		} else if(openCards.length === 2){
			checkMatch();
		}
	});
});


initGame();