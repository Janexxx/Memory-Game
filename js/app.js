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

	$('.fa-star').css('color', '#F4A460');
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

function showLoseMessage(){
	$('.losingText').text('You lose the game with '+numStar+' star.');
};

// To check if the card is already opened. 
function isValid(card){
	return !(card.hasClass('open') || card.hasClass('match'));
};

// To check if the two cards in openCards array are same or not. 
function checkMatch(){
	if(openCards.length == 2){ // Check if match when two cards are stored in the openCards array.
		if (openCards[0] == openCards[1]){ // If they are matched
			keepOpenOfMatch($('.card:has(.'+openCards[0]+')')); 
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

// under some circumstances, we do not want the card click to do anything
// handle those circumstances here
function validate(card){

	// if game is over, don't do anything
	if (matchedCards.length === 16){
		console.log('Game is over');
		return false;
	}

	// if card is already open, don't do anything
	if (card.hasClass('match') ||
		card.hasClass('open') ||
		card.hasClass('show')){
		console.log('Card is already open or matched');
		return false;
	}

	// if there are already 2 or more cards open, don't do anything
	if (openCards.length > 1){
		console.log('There are 2 or more cards open already.');
		return false;
	}

	return true;
}

function handleMatch(){
	console.log('Cards are matching');
	openCards.forEach(function(element){

		matchedCards.push(element);
		keepOpenOfMatch($('.card:has(.' + element + ')'));

		// if game is over, don't do anything
		if (matchedCards.length === 16){
			console.log('Game is over');
			return false;
		}

	});
	openCards.length = 0;
}

function checkMatchModified(){
	match = (openCards[0] === openCards[1])
	if (match){
		handleMatch();
	}
	else{
		console.log('Cards are NOT matching');
	}
}

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
	setTimeout(checkMatchModified, 500);
	return;

	if(isValid(card)){
		if(openCards.length <= 1){
			showSymbol(card);
			addToOpen(card);
		} else if(openCards.length == 2){
			increaseCounter();
			checkMatch();
			// setInterval(checkMatch, 1000);
		}
	}
}

$(document).ready(function(){
	$('.card').on('click', function(event){
		let card = $(event.target);
		cardClicked(card);
	});
});


initGame();