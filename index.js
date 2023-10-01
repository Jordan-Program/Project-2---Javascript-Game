
//variables use
const cards = document.querySelectorAll('.memory-card');
const hiddenDiv = document.querySelector('#hidden_div');

let flip_card = false;
let lock_board = false;
let first_move, second_move;
let moves_score = 0;


// function for background music
const audio = document.querySelector('#bg_music');
function muteBackgroundMusic() 
    {
        if (audio.muted) 
            {
                audio.muted = false;
                audio.play();
                document.querySelector('#game_sound').className = `btn question-mark border-0 fa-solid fa-volume-high`;
            } 
        
        else 
            {
                audio.muted = true;
                audio.pause();
                document.querySelector('#game_sound').className = `btn question-mark border-0 fa-solid fa-volume-off`;
            }   
    }
// function for start button
document.querySelector('#start_button').addEventListener('click', ()=>
    {
        audio.play();
        hiddenDiv.style.display = 'block';
        document.querySelector('#start_button').style.visibility='hidden';
        
        // code for music button to be visible
        let toggle = () => {

            let element = document.getElementById("game_sound");
            let hidden = element.getAttribute("hidden");
        
            if (hidden) {
               element.removeAttribute("hidden");
            } else {
               element.setAttribute("hidden", "hidden");
            }
          }
        toggle();
    });   

// function for animation.
function flipCard() 
    {   
                
        if (lock_board) return;
        if (this === first_move) return;

        this.classList.add('flip');

        if (!flip_card) 
            {
                // first click
                flip_card = true;
                first_move = this;

                        return;
            }

        // second click
        second_move = this;

        checkForMatch();
        checkForWin();
        allCardsFlippedTrue();
                
    }

// function for checking if user flip the same card.
function checkForMatch() 
    {
        moves_score++;
        updateScore();

        let isMatch = first_move.dataset.framework === second_move.dataset.framework;

        isMatch ? disableCards() : unflipCards();

                
    }

// function for card to disable after flip the same card.
function disableCards() 
    {
        first_move.removeEventListener('click', flipCard);
        second_move.removeEventListener('click', flipCard);

        resetBoard();

    }

// function for card to unflip again if not match.
function unflipCards() 
    {
        lock_board = true;

        setTimeout(() => {
            first_move.classList.remove('flip');
            second_move.classList.remove('flip');

            resetBoard();
        }, 400);
    }

// function for card to be able to flip again.   
function resetBoard() 
    {
        [flip_card, lock_board] = [false, false];
        [first_move, second_move] = [null, null];
    }

// function for card to be shuffle every refresh.
(function shuffle() 
    {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();
// function for cards to flip
cards.forEach(card => card.addEventListener('click', flipCard));

// function to update scores
function updateScore()
    {
            document.querySelector('#moves_score').innerHTML = moves_score;
    }

// function to check is the player is winning or lossing
function checkForWin() 
    {   
                
        if (moves_score <= 10 && allCardsFlippedTrue()) 
            {
                const winner_modals = new bootstrap.Modal(document.querySelector('#winner_modal'));
                winner_modals.show();
                            
                            

            }
        else if (moves_score == 11 && allCardsFlippedTrue()) 
            {
                const loser_modals = new bootstrap.Modal(document.querySelector('#loser_modal'));
                loser_modals.show();

                                
            }  
        else if (moves_score > 10 && !allCardsFlippedTrue()) 
            {
                const loser_modals = new bootstrap.Modal(document.querySelector('#loser_modal'));
                loser_modals.show();
                            
            }
    }   
        
// function to check if all cards are flipped true
function allCardsFlippedTrue() 
    {
                return [...cards].every(card => card.classList.contains('flip'));
    }
                 
// function for modal losser
function reloadPageLoser()
    {
        document. querySelector('#losers_modal').addEventListener('click', (e) =>
        {
                    window.location.reload();
        });
    }

// function for modal winner
function reloadPageWinner()
    {
        document. querySelector('#winners_modal').addEventListener('click', (e) =>
        {
                    window.location.reload();
        });
    }

            
    reloadPageLoser();   
    reloadPageWinner();
    
// function for modal game instruction
document.querySelector('#btn_instruction').addEventListener('click', instruction);
            
function instruction()
    {
        const instructions = new bootstrap.Modal(document.querySelector('#instruction'))
        instructions.show();
    }
