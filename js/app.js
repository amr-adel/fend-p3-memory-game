const cardDataIds = [
    'n78d2ps', 'n78d2ps',
    'n8sd1p0', 'n8sd1p0',
    'n74dfp6', 'n74dfp6',
    'n75dnpc', 'n75dnpc',
    'n06d9pa', 'n06d9pa',
    'n5rdmp2', 'n5rdmp2',
    'n18dypr', 'n18dypr',
    'n6pdipz', 'n6pdipz'
];


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
    const arr = document.getElementById('deck').getElementsByTagName('li');
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('data-id', random[i]);
    }
}

randmize();

document.getElementById('restart').addEventListener('click', reset);

function reset() {
    glance = [];
    numberOfMoves = 0;
    document.getElementById('moves').innerHTML = numberOfMoves;
    matched = [];
    const arr = document.getElementById('deck').getElementsByTagName('li');
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('class', 'card animated');
    }
    randmize();
}


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



document.getElementById('deck').addEventListener('click', checkMatch);


let glance = [];
let numberOfMoves = 0;
let matched = [];

function checkMatch(card) {
    if (card.target.tagName == 'LI') {
        if (glance.length == 0 && matched.indexOf(card.target.id) == -1) {
            reveal(card);
        } else if (card.target.id === glance[1] || matched.indexOf(card.target.id) != -1) {
            console.log('nope');
        } else {
            card.target.getAttribute('data-id') === glance[0] ? match(card) : noMatch(card);
            glance = [];
            addMove();
        }
    }
}


function reveal(card) {
    card.target.classList.add('match', 'fadeIn');
    setTimeout(function() {
        card.target.classList.remove('fadeIn');
    }, 500);
    glance.push(card.target.getAttribute('data-id'), card.target.id);
}


function match(card) {
    let revealed = document.getElementById(glance[1]);
    card.target.classList.add('match');
    setTimeout(function() {
        card.target.classList.add('tada');
        revealed.classList.add('tada');
        setTimeout(function() {
            revealed.classList.remove('tada');
            card.target.classList.remove('tada');
        }, 1000)
    }, 300);
    matched.push(card.target.id, glance[1]);
    if (matched.length == 16) {
        setTimeout(winner, 1400)
    }
}


function noMatch(card) {
    let revealed = document.getElementById(glance[1]);
    card.target.classList.add('match');
    setTimeout(function() {
        revealed.classList.add('shake');
        card.target.classList.add('shake');
        setTimeout(function() {
            revealed.classList.remove('match', 'shake');
            card.target.classList.remove('match', 'shake');
        }, 500);
    }, 400);
}


function addMove() {
    numberOfMoves++;
    document.getElementById('moves').innerHTML = numberOfMoves;
}

function winner() {
    const matchesNumber = 2;
    const win = document.getElementById('win');
    win.style.display = 'block';
    win.classList.add('tada');
}
