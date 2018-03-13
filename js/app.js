/*
 * Create a list that holds all of your cards
 */

const cardDataIds = [  'n78d2ps', 'n78d2ps',
                  'n8sd1p0', 'n8sd1p0',
                  'n74dfp6', 'n74dfp6',
                  'n75dnpc', 'n75dnpc',
                  'n06d9pa', 'n06d9pa',
                  'n5rdmp2', 'n5rdmp2',
                  'n18dypr', 'n18dypr',
                  'n6pdipz', 'n6pdipz'
                ];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function randmize() {
    let random = shuffle(cardDataIds);
    var arr = document.getElementById('deck').getElementsByTagName('li');
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('data-id', random[i]);
    }
}

document.getElementById('restart').addEventListener('click', randmize);

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

let tempRevealedCard = [];

document.getElementById('deck').addEventListener('click', checkMatch);

function checkMatch(card) {
    if (card.target.tagName == 'LI') {
        if (tempRevealedCard.length == 0) {
            card.target.classList.add('match');
            tempRevealedCard.push(card.target.getAttribute('data-id'), card.target.id);
        } else {
            card.target.getAttribute('data-id') === tempRevealedCard[0] ? match(card) : noMatch(card);
            tempRevealedCard = [];
        }

    }
}

function match(card) {
    card.target.classList.add('match');
    console.log("Good!");
}

function noMatch(card) {
    console.log("Try again");
    document.getElementById(tempRevealedCard[1]).classList.remove('match');
}


//            console.log(temp);