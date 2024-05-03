'use strict';
// vars 
let players_score, round_score, active_player;


// initialisation 
function initialisation() {

    players_score = [0, 0];
    round_score = 0;
    active_player = 0;

    change_active_player_style();

    // Hide the dice initially

    document.querySelector('.dice-image').style.display = 'none';
    // document.querySelector('.dice-image').classList.toggle('.hidden');

    // Set all scores to 0

    // total players score
    document.getElementById('player-0-score').textContent = '0';
    document.getElementById('player-1-score').textContent = '0';   

    // current round score 
    document.getElementById('player-0-current-amount').textContent = '0';
    document.getElementById('player-1-current-amount').textContent = '0';

}


//roll a dice 
function roll_dice() {
    
    document.querySelector('.dice-image').style.opacity = 1;
    // roll dice 
 
    const dice = Math.floor(Math.random() * 6) + 1;
     
    //display
    const diceDOM = document.querySelector('.dice-image');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;


    // Update score 
    if (dice !== 1) {
        round_score += dice;
        document.getElementById(`player-${active_player}-current-amount`).textContent = round_score;
    } else {
        
        change_player();
    }
}


//hold game 
function hold_score(){ 
        // Add round score to player score
        players_score[active_player] += round_score;
        document.getElementById(`player-${active_player}-score`).textContent = players_score[active_player];

        // Check is player win 
        if (players_score[active_player] >= 100) {
            document.getElementById(`player-${active_player}-name`).textContent =   `player ${active_player} is the Winner!!!`;
            document.getElementById(`player-${active_player}-current-amount`).textContent = '\uD83C\uDF89'; //  JavaScript escape sequence party popper emoji
            document.querySelector('.dice-image').style.display = 'none';
            document.querySelector('.btn-roll-dice').style.display = 'none';
            document.querySelector('.btn-hold-score').style.display = 'none';
        } else {
            
            change_player();
        }
    }    


//change player 
function change_player() {
    active_player === 0 ? (active_player = 1) : (active_player = 0); // if active player is 0 change to 1 else change to 0
    round_score = 0;
    document.getElementById('player-0-current-amount').textContent = '0';
    document.getElementById('player-1-current-amount').textContent = '0';
    
    change_active_player_style();
}


// change active player style 
function change_active_player_style(){
    
    document.querySelector('.dice-image').style.opacity = 0.1;

        if (active_player === 0) {
            document.querySelector('.player-0').classList.add('active-player');
            document.querySelector('.player-1').classList.remove('active-player');
        } else {
            document.querySelector('.player-1').classList.add('active-player');
            document.querySelector('.player-0').classList.remove('active-player');
        }
    
}

//new game btn 
document.querySelector('.btn-new-game').addEventListener('click', initialisation);
//roll dice btn 
document.querySelector('.btn-roll-dice').addEventListener('click', roll_dice);
//hold score btn 
document.querySelector('.btn-hold-score').addEventListener('click', hold_score);

initialisation();