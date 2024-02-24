const GameBoard = (function() {
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

    return {
        printBoard,
    }
})();

const PlayerO = (function() {
    const playerName = "Player O"
    const wins = 0;
    
    const incrementWins = () => wins++;
    const getWins = () => wins;

    return {
        incrementWins,
        getWins,
    }
})()

const PlayerX = (function() {
    const playerName = "Player X"
    const wins = 0;
    
    const incrementWins = () => wins++;
    const getWins = () => wins;

    return {
        incrementWins,
        getWins,
    }
})()

