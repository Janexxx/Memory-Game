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
let openCards = [];
let matchedCards = [];
let counter = 0;
let numStar = 3; 

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

// bind reset button's click event
function bindResetClickEvent(){
	$('.restart').on('click', function(){
		initGame();
	});
}

// bind card's click event
function bindCardClickEvent(){
	$('.card').on('click', function(event){
		let card = $(event.target);
		cardClicked(card);
	});
}

// ensure that variables are initialized
function initVariables(){
	openCards.length = 0;
	matchedCards.length = 0;
	counter = 0;
	numStar = 0;
}

// clear verbiage on the text
function clearText(){
	$('.deck').empty();
	$('.moves').text('0');
	$('.winningText').text('');
	$('.losingText').text('');
}

// shuffle the list of cards
function randomizeCards(){
	let newCardSymbol = shuffle(cardSymbol);
	for(let i = 0; i < cardSymbol.length; i++){
		$('.deck').append('<li class="card"><i class="fa ' + cardSymbol[i] + '"></i></li>');
	}
}

// Ramdomizes cards and updates card on HTML.
function initGame(){
	initVariables();
	clearText();
	randomizeCards();
	bindCardClickEvent();
	$('.fa-star').css('color', '#F4A460');
};

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

function increaseCounter(){
	counter += 1;
	$('.moves').text(counter);
	// Decrease the star according to the number of moves that player made.
	if(counter === 5){
		$('#third-star').css('color','#fefefe');
		numStar = 2;
	} else if(counter === 10){
		$('#second-star').css('color','#fefefe');
		numStar = 1;
	} else if(counter > 15){
		numStar = 0;
		showLoseMessage();
	}
};

// The message will be shown when player win the game. 
function showWinMessage(){
	$('.winningText').text('You have won the game with '+numStar+' star. Congratulations!');
};

// The message will be shown when player loses the game.
function showLoseMessage(){
	$('.losingText').text('You lose the game with '+numStar+' star.');
};

// To check if the card is already opened. 
function isValid(card){
	return !(card.hasClass('open') || card.hasClass('match'));
};

// check if a game is over
function isGameOver(){
	if (matchedCards.length === 16){
		console.log('Game is over');
		return true;
	}

	return false;
}

// check if the card is already opened, showed or already matched
function isAlreadyOpen(card){
	if (card.hasClass('match')) return true;
	if (card.hasClass('open')) return true;
	if (card.hasClass('show')) return true;

	return false;
}

// under some circumstances, we do not want the card click to do anything
// handle those circumstances here
function validate(card){

	// if game is over, don't do anything
	if(isGameOver()) return false;

	// if card is already open, don't do anything
	if (isAlreadyOpen(card)) return false;

	// if there are already 2 or more cards open, don't do anything
	if (openCards.length > 1) return false;

	return true;
}

// keep cards open and remember the cards when there's a match
function handleMatch(){
	console.log('Cards are matching');
	openCards.forEach(function(element){
		matchedCards.push(element);
		keepOpenOfMatch($('.card:has(.' + element + ')'));
		isGameOver();
	});
	openCards.length = 0;
}

// hide the cards when there's not a match
function handleNoMatch(){
	console.log('Cards are NOT matching');
	openCards.forEach(function(element){
		hideSymbol($('.card:has(.' + element + ')'));
	});
	openCards.length = 0;
}

// handle conditions when there's match or not a match
function checkMatch(){
	match = (openCards[0] === openCards[1])
	if (match){
		handleMatch();
	}
	else{
		handleNoMatch();
	}

	increaseCounter();
}

// handle functionality when card is clicked
// validate to see if any action needs to be taken
// remember the card that was clicked
// perform match if this is the 2nd card that was clicked
function cardClicked(card){

	if (!validate(card)) return;

	// open the card and remember the opened card
	showSymbol(card);
	addToOpen(card);

	// if this is the first card that's opened, do nothing
	if (openCards.length === 1) {
		console.log('Waiting for the 2nd card to be clicked');
		return;
	}

	console.log('2nd card clicked. Must do matching');
	setTimeout(checkMatch, 500);
}

$(document).ready(function(){
	bindCardClickEvent();
	bindResetClickEvent();
});


initGame();