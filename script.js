class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restartBtn');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        this.updateStatus();
        this.updateScores();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        // Destacar células vencedoras
        this.winningConditions.forEach(condition => {
            if (condition.every(index => this.board[index] === this.currentPlayer)) {
                condition.forEach(index => {
                    this.cells[index].classList.add('winning');
                });
            }
        });
        
        this.statusElement.textContent = `Jogador ${this.currentPlayer} venceu!`;
        this.statusElement.style.background = '#c6f6d5';
        this.statusElement.style.color = '#22543d';
    }
    
    handleDraw() {
        this.gameActive = false;
        this.statusElement.textContent = 'Empate!';
        this.statusElement.style.background = '#fed7d7';
        this.statusElement.style.color = '#742a2a';
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        this.statusElement.textContent = `Vez do jogador ${this.currentPlayer}`;
        this.statusElement.style.background = '#e2e8f0';
        this.statusElement.style.color = '#4a5568';
    }
    
    updateScores() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 