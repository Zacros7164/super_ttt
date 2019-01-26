// put entire game inside of original submit event listener to prevent default action of form

function submitForm(event){
    event.preventDefault()
    // get user input and toggle messages
    let userInput = $('#user-input').val()
    if(userInput == ''){
        // if the user doesn't input a value, default the grid size to 3
        userInput = 3;
    }
    $('#user-input').val('')
    $('.intro-message').toggle()
    $('#message').toggle()
    $('#game-board').toggle()
    // algorithm to create game board
    for(let i=0; i<userInput; i++){
        $('#game-board').append(`<div class="row"><div id="row${i}" class="col-12"></div></div>`)
        for(let j = 0; j< userInput; j++){
            $(`#row${i}`).append(`<button id="${i}${j}" class="square">-</button>`)
        }
    }
    // algorithm to add all winning combos to a single array
    let winCombos = []
    getWinCombos(userInput, winCombos)
    
    // initialize game variables and being click listener loop
    const squares = $('.square');
    let gameOn = true;
    let whosTurn = 1;
    let player1Squares = [];
    let player2Squares = [];
    squares.each(function(i){
        $(this).click(function(){
            if(gameOn){
                if($(this).text() === "-"){
                    if(whosTurn === 1){
                        $(this).text("X");
                        whosTurn = 2;
                        $('#message').text("It's O's turn")
                        player1Squares.push($(this).attr('id'))
                        checkWin(player1Squares, 1)
                    }else{
                        $(this).text("O");
                        whosTurn = 1;
                        $('#message').text("It's X's turn");
                        player2Squares.push($(this).attr('id'))
                        checkWin(player2Squares,2)
                    }
                }else{
                    $('#message').text("Sorry, that's not a valid move")
                }
            }
        })
    })


    function checkWin(playerSquares, whoMarked) {
        // function to check the player's squares against the winning combinations

        for(let i=0;i<winCombos.length;i++){
            squareCount = 0
            for(let j=0;j<playerSquares.length;j++){
                if(winCombos[i].includes(playerSquares[j])){
                    squareCount++
                }
                
            }
            if(squareCount == userInput){
                console.log('hooray')
                endGame(winCombos,whoMarked)
            }
        }
       
    }


    function endGame(winningCombo, whoWon){
        gameOn = false;
        $('#message').html(`Congrats to Player ${whoWon}`);
        for(let i = 0; i < winningCombo.length; i++){
            const squareElem = document.getElementsByClassName('square')
            $(squareElem).addClass('winning-square')
        }
        $('#playAgain').toggle();

    }
    
}

function getWinCombos(userNumber,winningArray){
    // for row winnning combos
    for(let i=0; i < userNumber; i++){
        let rowArray = []
        for(let j=0; j < userNumber; j++){
            rowArray.push(`${i}${j}`)
        }
        winningArray.push(rowArray)
    }

    // for column winning combos
    for(let i = 0; i < userNumber; i++){
        let colArray = []
        for(let j=0; j < userNumber; j++){
            colArray.push(`${j}${i}`)
        }
        winningArray.push(colArray)
    }

    // for left diagonals
    let leftDiagArray = []
    for(let i = 0; i < userNumber; i++){
        leftDiagArray.push(`${i}${i}`)
    }
    winningArray.push(leftDiagArray)


    // for right diagonals
    let rightDiagArray = []
    for(let i = 0; i < userNumber; i++){
        let secondDigit = userNumber - (i+1)
        rightDiagArray.push(`${i}${secondDigit}`)
    }
    winningArray.push(rightDiagArray)
}

// game reset function that toggles the appropriate messages on and off

function playAgain(){
    $('.intro-message').toggle()
    $('#message').toggle()
    $('#playAgain').toggle();
    $('#game-board').toggle();
    $('#game-board').html('');
    $('#message').html("It's X's Turn")
}