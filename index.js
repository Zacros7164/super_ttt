// console.log("sanity check")

function submitForm(event){
    event.preventDefault()
    // get user input and toggle messages
    let userInput = $('#user-input').val()
    $('#user-input').val('')
    $('.intro-message').toggle()
    $('#message').toggle()
    $('#game-board').toggle()
    // algorithm to create game board
    for(let i=0; i<userInput; i++){
        $('#game-board').append(`<div id="row${i}" class="row"></div>`)
        for(let j = 0; j< userInput; j++){
            $(`#row${i}`).append(`<button id="${i}${j}" class="square">-</button>`)
        }
    }
    // algorithm to add all winning combos to a single array
    let winCombos = []
    getWinCombos(userInput, winCombos)
    console.log(winCombos)
    
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
                        // console.log(player1Squares)
                        checkWin(player1Squares, 1)
                        // checkWinCol(player1Squares, 1)
                        // checkWinLeftDiag(player1Squares,1)
                        // checkWinRightDiag(player1Squares, userInput, 2)
                    }else{
                        $(this).text("O");
                        whosTurn = 1;
                        $('#message').text("It's X's turn");
                        player2Squares.push($(this).attr('id'))
                        // console.log(player2Squares)
                        checkWin(player2Squares,2)
                        // checkWinCol(player2Squares,2)
                        // checkWinLeftDiag(player2Squares,2)
                        // checkWinRightDiag(player2Squares, userInput, 2)
                    }
                }else{
                    $('#message').text("Sorry, that's not a valid move")
                }
            }
        })
    })


    function checkWin(playerSquares, whoMarked) {
        // for(let i=0; i < userInput; i++){
        //     let squareCount = 0;
        //     // console.log(squareCount)
        //     for(let j = 0; j < userInput; j++){
        //         const winningSquare = winCombos[i][j]
        //         // console.log("row: " + winningSquare)
        //         if(playerSquares.includes(winningSquare)){
        //             squareCount++;
                    
                    
        //         }
        //     }
        //     if(squareCount == userInput){
        //         endGame(winCombos[i], whoMarked);
        //     }
        // }
       
        // if(winCombos[0].length == playerSquares.length){
        //     let count = 0
        //     for(let i=0;i<playerSquares.length;i++){
        //         // console.log(i)
        //         for(let j=0;j<winCombos.length;i++){
        //             console.log(winCombos[i])
        //             if(winCombos[i][j]==playerSquares[i]){
        //                 count++
        //                 console.log("count increased")
        //             }
        //             if(count == winCombos[0].length){
        //                 console.log("this actually worked")
        //             }
        //         }
        //     }
        // }
        
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
    // function checkWinCol(playerSquares, whoMarked) {
    //     for(let i=0; i < userInput; i++){
    //         let squareCount = 0;
    //         // console.log(squareCount)
    //         for(let j = 0; j < userInput; j++){
    //             const winningSquare = winCombos[j][i]
    //             // console.log("col: " + winningSquare)
    //             if(playerSquares.includes(winningSquare)){
    //                 squareCount++;
                    
                    
    //             }
    //         }
    //         if(squareCount == userInput){
    //             endGame(winCombos[i], whoMarked);
                
    //         }
    //     }
    // }

    // function checkWinLeftDiag(playerSquares, whoMarked){
    //     // for(let i=0; i < userInput; i++){
    //     //     let squareCount = 0;
    //     //     // console.log(squareCount)
    //     //     const winningSquare = winCombos[i][i]
    //     //     // console.log("left: " + winningSquare)
    //     //     if(playerSquares.includes(winningSquare)){
    //     //         squareCount++;
                
    //     //     }
    //     //     if(squareCount == userInput){
    //     //         endGame(winCombos[i], whoMarked);
                
    //     //     }
    //     // }
    //     if(winCombos.includes(playerSquares)){
    //         console.log("it worked")
    //         endGame(winCombos,whoMarked)
    //     }
    // }

    // function checkWinRightDiag(playerSquares, userNumber, whoMarked){
    //     for(let i = 0; i < userNumber; i++){
    //         let squareCount = 0;
    //         const winningSquare = winCombos[i][(userNumber-(i+1))];
    //         // console.log("winning Square is: " + winningSquare)
    //         // rightDiagArray.push(`${i}${userNumber - i}`)
    //         // console.log("right: " + winningSquare)
    //         if(playerSquares.includes(winningSquare)){
    //             squareCount++;
                
    //         }
    //         if(squareCount == userInput){
    //             endGame(winCombos[i], whoMarked)
    //         }
    //     }
    // }

    function endGame(winningCombo, whoWon){
        // console.log("endGame ran")
        gameOn = false;
        $('#message').html(`Congrats to Player ${whoWon}`);
        for(let i = 0; i < winningCombo.length; i++){
            // const winningSquare = winningCombo[i];
            // const squareElem = document.getElementById(winningSquare);
            const squareElem = document.getElementsByClassName('square')
            $(squareElem).addClass('winning-square')
            // console.log("winCombos[i] is " + winCombos[i])
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
        // console.log("second digit is: " + secondDigit)
    }
    winningArray.push(rightDiagArray)
}

function playAgain(){
    $('.intro-message').toggle()
    $('#message').toggle()
    $('#playAgain').toggle();
    $('#game-board').toggle();
    
}