let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStatus = document.getElementById('game-status');

function changeColorEvent(element, player) {
    var customEventComp = new CustomEvent('colorChange', {
        detail: {
            element: element,
            player: player
        }
    });
    document.body.dispatchEvent(customEventComp);
}

document.body.addEventListener('colorChange', function (event) {
    const element = event.detail.element;
    const player = event.detail.player;

    if (player === 'X') {
        element.style.backgroundColor = 'lightblue';
    } else if (player === 'O') {
        element.style.backgroundColor = 'lightgreen';
    }
});

function checkWinner() {
    const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombination.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeAttribute('onclick'));
}

function makeMove(index) {
    if (gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    const cell = document.getElementsByClassName('cell')[index];
    cell.textContent = currentPlayer;

    changeColorEvent(cell, currentPlayer);

    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        disableBoard();
    } else if (gameBoard.every(cell => cell !== '')) {
        gameStatus.textContent = "It's a draw.";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameStatus.textContent = '';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
        cell.setAttribute('onclick', 'makeMove(' + Array.from(cells).indexOf(cell) + ')');
    });
}
