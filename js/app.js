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

document.getElementById('play-again').addEventListener('click', restart);
document.getElementById('restart').addEventListener('click', restart);

function restart() {
    glance = [];
    numberOfMoves = 0;
    starRating.reset();
    starRating.number = 5;
    gameTime.stop();
    timerState = false;
    document.getElementById('time').innerHTML = '0:00';
    document.getElementById('moves').innerHTML = numberOfMoves;
    matched = [];
    const arr = document.getElementById('deck').getElementsByTagName('li');
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('class', 'card animated');
    }
    randmize();
    document.getElementById('modal').style.display = 'none';
}


document.getElementById('deck').addEventListener('click', checkMatch);


let glance = [];
let numberOfMoves = 0;
let matched = [];
let timerState = false;

function checkMatch(card) {
    if (card.target.tagName == 'LI') {
        if (!timerState) {
            gameTime.start();
            timerState = true;
        }
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
    setTimeout(function () {
        card.target.classList.remove('fadeIn');
    }, 500);
    glance.push(card.target.getAttribute('data-id'), card.target.id);
}


function match(card) {
    let revealed = document.getElementById(glance[1]);
    card.target.classList.add('match');
    setTimeout(function () {
        card.target.classList.add('tada');
        revealed.classList.add('tada');
        setTimeout(function () {
            revealed.classList.remove('tada');
            card.target.classList.remove('tada');
        }, 1000)
    }, 300);
    matched.push(card.target.id, glance[1]);
    if (matched.length == 4) {
        setTimeout(gameOver.winner, 1400)
    }
}


function noMatch(card) {
    let revealed = document.getElementById(glance[1]);
    card.target.classList.add('match');
    setTimeout(function () {
        revealed.classList.add('shake');
        card.target.classList.add('shake');
        setTimeout(function () {
            revealed.classList.remove('match', 'shake');
            card.target.classList.remove('match', 'shake');
        }, 500);
    }, 400);
}


function addMove() {
    numberOfMoves++;
    if (numberOfMoves == 12 || numberOfMoves == 18 || numberOfMoves == 25) {
        starRating.empty();
    };
    document.getElementById('moves').innerHTML = numberOfMoves;
}

const modal =  document.getElementById('modal');
const state =  document.getElementById('state');
const modalState =  document.getElementById('modal-state');
const modalTitle =  document.getElementById('modal-title');
const modalSubtitle =  document.getElementById('modal-subtitle');

const gameOver = {
    winner: function () {
        modalTitle.textContent = "Congratulations!";
        modalSubtitle.textContent = "You matched all fruits";
        modalState.innerHTML = state.innerHTML;
        gameTime.stop();
        modal.style.display = 'block';
        modal.classList.add('tada');
    },
    loser: function () {
        modalTitle.textContent = "Ooooops!";
        modalSubtitle.textContent = "You ran out of stars before matching all fruits";
        modalState.innerHTML = state.innerHTML;
        gameTime.stop();
        modal.style.display = 'block';
        modal.classList.add('tada');
    }
}


const gameTime = {
    timer: '',
    start: function () {
        let seconds = 0;
        let minutes = 0;

        function clock() {
            if (seconds == 59) {
                seconds = 0;
                minutes++;
            } else {
                seconds++;
            }
            let time = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            document.getElementById('time').innerHTML = time;
            if (seconds == 30) {
                starRating.empty();
            }
        }
        gameTime.timer = setInterval(clock, 1000);
    },
    stop: function () {
        clearInterval(gameTime.timer);
    }
}

const starRating = {
    number: 5,
    empty: function () {
        if (starRating.number == 0) {
            gameOver.loser();
        } else { 
            document.getElementById('star' + (starRating.number)).classList.add('empty');
            starRating.number--;
        }
    },
    reset: function () {
        const emptyStars = document.getElementsByClassName('empty');
        for (let i = 0; i < emptyStars.length;) {
            emptyStars[i].classList.remove('empty');
        }
    }
}
