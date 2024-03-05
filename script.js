const GameBoard = (function() {
    console.log('setting up board')
    let emptySpots = 9;
    const board = new Array(3);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(3).fill('?');
    }

    const printBoard = () => {
        let str = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                str += board[i][j];
            }
            str += '\n';
        }
        console.log(str);
    } 

    printBoard();

    const placePiece = (piece, row, col) => {
        console.log('placing piece')
        console.log({piece, row, col})
        board[row][col] = piece;
        emptySpots--;
    }

    const checkBoard = () => {
        const checkIfMatching = (var1, var2, var3) => {
            if (var1 === '?' &&
                var2 === '?' &&
                var3 === '?'
            ) {
                return false;
            }
            if ((var1 === var2) && (var2 === var3)) {
                return true;
            } else return false;
        }
        const checkRows = () => {
            for (let row = 0; row < board.length; row++) {
                if (checkIfMatching(
                    board[row][0],
                    board[row][1],
                    board[row][2])
                ) {
                    return board[row][0];
                }
            }
            return '';
        }
        const checkCols = () => {
            for (let col = 0; col < board.length; col++) {
                if (checkIfMatching(
                    board[0][col],
                    board[1][col],
                    board[2][col])
                ) {
                    return board[0][col];
                }
            }
            return '';
        }
        const checkDiags = () => {
            if (checkIfMatching(
                board[0][0],
                board[1][1],
                board[2][2])
            ) {
                return board[0][0];
            } else if (checkIfMatching(
                board[0][2],
                board[1][1],
                board[2][0])
            ) {
                return board[0][2];
            }
            return '';
        }
        const checkDraw = () => {
            console.log({emptySpots});
            if (emptySpots === 0) return 'draw';
            else return '';
        }
        const rows = checkRows();
        const cols = checkCols();
        const diags = checkDiags();
        const draw = checkDraw();
        console.log({
            rows,
            cols,
            diags,
            draw
        })
        if (draw) return draw;
        if (rows !== '') return rows;
        if (cols !== '') return cols 
        if (diags !== '') return diags; 
        return ""
    }

    const placeOpen = (row, col) => {
        if (board[row][col] === '?') return true;
        return false;
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                board[i][j] = '?';
            }
        }
        emptySpots = 9;
        console.log("Board Reset...")
        printBoard();
    }

    return {
        printBoard,
        placePiece,
        checkBoard,
        placeOpen,
        resetBoard,
    }
})();

function createPlayer(piece) {
    const playerPiece = piece;
    const playerName = `Player ${piece}`
    const wins = 0;
    
    const getPlayerPiece = () => playerPiece;
    const getPlayerName = () => playerName;
    const incrementWins = () => wins++;
    const getWins = () => wins;

    return {
        getPlayerPiece,
        getPlayerName,
        incrementWins,
        getWins,
    }
}

const PlayerO = createPlayer('O');
const PlayerX = createPlayer('X');

const Game = (function() {
    const players = [PlayerX, PlayerO];
    const board = GameBoard;
    let currentPlayer = 0;
    let gameOver = false;
    console.log('setting up game')

    const printPlayers = () => {
        let str = '';
        for (const player of players) {
            str += player.getPlayerName()
            str += ' ' + player.getWins()
            str += '\n';
        }
        console.log(str);
    }

    const start = () => {
        let gameOver = false;
        let currentPlayer = 0;
        let endGameState = '';
        while(!gameOver) {
            board.printBoard();
            console.log(`${players[currentPlayer].getPlayerName()}, your turn!`)
            const row = prompt("enter row")
            const col = prompt("enter col")
            board.placePiece(players[currentPlayer].getPlayerPiece(), row, col);
            board.printBoard();
            endGameState = board.checkBoard();
            currentPlayer = (currentPlayer + 1) % players.length;
            if (endGameState) {
                gameOver = true;
            }
        }
        if (endGameState === 'draw') {
            console.log("Draw!");
        } else {
            console.log(`Player ${endGameState} won!`);
        }
    }

    const getCurrentPlayer = () => {
        return players[currentPlayer].getPlayerName();
    }

    const getCurrentPiece = () => {
        return players[currentPlayer].getPlayerPiece();
    }

    const placePiece = (row, col) => {
        board.placePiece(players[currentPlayer].getPlayerPiece(), row, col);
        board.printBoard();
        console.log(board.checkBoard());
        currentPlayer = (currentPlayer + 1) % players.length;
        console.log(currentPlayer)
    }

    const reset = () => {
        currentPlayer = 0;
        gameOver = false;
        console.log('reset game')
        console.log(gameOver);
    }

    const checkEndGame = () => {
        const endGameState = GameBoard.checkBoard();
        console.log(endGameState)
        if (endGameState) gameOver = true;
        return endGameState;
    }

    const getGameOver = () => {
        return gameOver;
    }

    return {
        printPlayers,
        start,
        placePiece,
        getCurrentPlayer,
        getCurrentPiece,
        getGameOver,
        checkEndGame,
        reset,
    }
})()

const GameDisplay = (function() {
    // Define globals
    const board = new Array(3);
    const message = document.createElement('p');
    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('newGameBtn');
    newGameBtn.innerText = 'New Game'
    message.classList.add('message');
    message.innerText = (`${Game.getCurrentPlayer()}, your turn!`);
    // Define event listeners
    const gridItemClick = (event) => {
        const i = event.target.getAttribute('i')
        const j = event.target.getAttribute('j')
        console.log(`Game.gameOver: ${Game.getGameOver()}`)
        if (GameBoard.placeOpen(i, j) && !Game.getGameOver()) {
            event.target.innerText = Game.getCurrentPiece();
            Game.placePiece(i, j)
            const endGameState = Game.checkEndGame();
            if (endGameState) {
                endGameState === 'draw' ? 
                message.innerText = 'Draw!'
                :
                message.innerText = `Player ${endGameState} won!`
            } else {
                message.innerText = (`${Game.getCurrentPlayer()}, your turn!`);
            }
        }
    }
    const resetUIBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                board[i][j].innerText = '';
            }
        }
        message.innerText = (`${Game.getCurrentPlayer()}, your turn!`);
    }
    const newGame = () => {
        GameBoard.resetBoard();
        Game.reset();
        resetUIBoard();
    }
    newGameBtn.addEventListener('click', () => newGame());
    // Set up UI
    const main = document.querySelector("main");
    main.appendChild(message);
    main.appendChild(newGameBtn);
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('grid');
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(3);
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = document.createElement("div");
            board[i][j].classList.add('grid-item');
            board[i][j].classList.add(`item${i}${j}`);
            board[i][j].innerText = '';
            board[i][j].addEventListener('click', event => gridItemClick(event));
            board[i][j].setAttribute('i', i)
            board[i][j].setAttribute('j', j)
            boardDiv.appendChild(board[i][j]);
        }
    }
    const leftVerticalDivider = document.createElement("div");
    leftVerticalDivider.classList.add("leftVerticalDivider");
    leftVerticalDivider.classList.add("divider");
    leftVerticalDivider.classList.add("vert");
    boardDiv.appendChild(leftVerticalDivider);
    const rightVerticalDivider = document.createElement("div");
    rightVerticalDivider.classList.add("rightVerticalDivider");
    rightVerticalDivider.classList.add("divider");
    rightVerticalDivider.classList.add("vert");
    boardDiv.appendChild(rightVerticalDivider);
    const topHorizontalDivider = document.createElement("div");
    topHorizontalDivider.classList.add("topHorizontalDivider");
    topHorizontalDivider.classList.add("divider");
    topHorizontalDivider.classList.add("horiz");
    boardDiv.appendChild(topHorizontalDivider);
    const bottomHorizontalDivider = document.createElement("div");
    bottomHorizontalDivider.classList.add("bottomHorizontalDivider");
    bottomHorizontalDivider.classList.add("divider");
    bottomHorizontalDivider.classList.add("horiz");
    boardDiv.appendChild(bottomHorizontalDivider);
    main.appendChild(boardDiv);
})()

// Game.start();