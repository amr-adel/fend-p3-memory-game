(function () {

// VARIABLES ==================================================================
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

    let glance = [];
    let matched = [];
    let clickable = true;
    let revealed;

    let timeActive = false;
    let moves = 0;

    const stateTime = document.getElementById('time');
    const stateMoves = document.getElementById('moves');

    const modal =  document.getElementById('modal');
    const state =  document.getElementById('state');
    const modalState =  document.getElementById('modal-state');
    const modalTitle =  document.getElementById('modal-title');
    const modalSubtitle =  document.getElementById('modal-subtitle');


// EVENT LISTENERS ==================================================================

    document.getElementById('play-again').addEventListener('click', init);
    document.getElementById('restart').addEventListener('click', init);
    document.getElementById('deck').addEventListener('click', check);


// SHUFFLE CARDS DATA-ID ==================================================================
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


// INITIALIZE NEW GAME ==================================================================

    function init() {
        glance = [];
        moves = 0;
        clickable = true;
        starRating.reset();
        gameTime.stop();
        timeActive = false;
        stateTime.innerHTML = '0:00';
        stateMoves.innerHTML = moves;
        matched = [];
        const arr = document.getElementById('deck').getElementsByTagName('li');
        for (let i = 0; i < arr.length; i++) {
            arr[i].setAttribute('class', 'card animated');
        }
        randmize();
        modal.style.display = 'none';
    }


// CHECK IF IT'S THE FIRST OR SECOND CARD TO REVEAL ==================================================================

    function check(card) {
        if (card.target.tagName == 'LI' && clickable) {
            // START TIME COUNTER IF IT WASN'T STARTED YET
            if (!timeActive) { 
                gameTime.start();
                timeActive = true;
            }
            if (glance.length == 0 && matched.indexOf(card.target.id) == -1) {
                reveal(card);
            } else if (card.target.id === glance[1] || matched.indexOf(card.target.id) != -1) {
                // IGNORE THE CLICK IF THE CARD IS ALREADY MATCHED OR TEMPORARILY REVEALD
            } else {
                // CHECK IF THE SECOND CARD MATCH THE FIRST OR NOT
                card.target.getAttribute('data-id') === glance[0] ? match.positive(card.target) : match.negative(card.target);
                clickable = false;
                glance = [];
                addMove();
            }
        }
    }


// REVEAL FIRST CARD ==================================================================

    function reveal(card) {
        card.target.classList.add('match');
        glance.push(card.target.getAttribute('data-id'), card.target.id);
    }


// MATCHING RESULT FUNCTIONS ==================================================================

    const match = {
        positive: function (card) {
            card.classList.add('match');
            revealed = document.getElementById(glance[1]);
            setTimeout(function () {
                card.classList.add('tada');
                revealed.classList.add('tada');
                card.addEventListener('animationend', () => {
                    revealed.classList.remove('tada');
                    card.classList.remove('tada');
                    clickable = true;
                })
            }, 300);
            matched.push(card.id, glance[1]);
            if (matched.length == 16) {
                setTimeout(gameOver.winner, 1400)
            }
        },
        negative: function (card) {
            card.classList.add('match');
            revealed = document.getElementById(glance[1]);
            setTimeout(function () {
                revealed.classList.add('shake');
                card.classList.add('shake');
                card.addEventListener('animationend', match.animationendCallback([card, revealed], ['match', 'shake']))
            }, 400);
        },
        animationendCallback: function(elements, classes) {
            for (let elemnet of elements) {
                for (let eClass of classes) {
                    elemnet.classList.remove(eClass)
                }
            }

            elements[0].removeEventListener('animationend', match.animationendCallback)
            clickable = true;
        }
    }


// MOVES COUNTER ==================================================================

    function addMove() {
        moves++;
        if (moves == 12 || moves == 18 || moves == 25) {
            starRating.loseOne();
        };
        stateMoves.innerHTML = moves;
    }


// GAME OVER WHEN GAME WON OR LOST ==================================================================

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


// TIME COUNTER ==================================================================

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
                stateTime.innerHTML = time;
                if (seconds == 30) {
                    starRating.loseOne();
                }
            }
            gameTime.timer = setInterval(clock, 1000);
        },
        stop: function () {
            clearInterval(gameTime.timer);
        }
    }


// STAR RATING ==================================================================

    const starRating = {
        number: 5,
        loseOne: function () {
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
            starRating.number = 5;
        }
    }

})();