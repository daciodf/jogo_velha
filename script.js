class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.playerNames = { X: 'Jogador X', O: 'Jogador O' };
        this.colors = { X: '#ff6b6b', O: '#4ecdc4' };
        this.boardBackground = '#2d3748';
        this.isDarkMode = true;
        this.victorySound = null;
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];
        
        this.themes = {
            default: {
                colorX: '#e53e3e',
                colorO: '#3182ce',
                boardBg: '#f7fafc'
            },
            dark: {
                colorX: '#ff6b6b',
                colorO: '#4ecdc4',
                boardBg: '#2d3748'
            },
            nature: {
                colorX: '#38a169',
                colorO: '#805ad5',
                boardBg: '#f0fff4'
            },
            sunset: {
                colorX: '#ed8936',
                colorO: '#e53e3e',
                boardBg: '#fffaf0'
            }
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restartBtn');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        this.playerXInput = document.getElementById('playerX');
        this.playerOInput = document.getElementById('playerO');
        this.playerXDisplay = document.getElementById('playerXDisplay');
        this.playerODisplay = document.getElementById('playerODisplay');
        this.resetScoreBtn = document.getElementById('resetScoreBtn');
        
        // Elementos do modal de configurações
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettings');
        this.colorXInput = document.getElementById('colorX');
        this.colorOInput = document.getElementById('colorO');
        this.boardBackgroundInput = document.getElementById('boardBackground');
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.victorySoundToggle = document.getElementById('victorySoundToggle');
        this.aiToggle = document.getElementById('aiToggle');
        this.isVictorySoundEnabled = true;
        this.isAIEnabled = false;
        
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.resetScoreBtn.addEventListener('click', () => {
            this.scores = { X: 0, O: 0 };
            this.saveState();
            this.updateScores();
        });
        
        // Adicionar listeners para os campos de nome
        this.playerXInput.addEventListener('input', () => this.updatePlayerNames());
        this.playerOInput.addEventListener('input', () => this.updatePlayerNames());
        
        // Adicionar listeners para configurações
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.colorXInput.addEventListener('change', () => this.updateColors());
        this.colorOInput.addEventListener('change', () => this.updateColors());
        this.boardBackgroundInput.addEventListener('change', () => this.updateBoardBackground());
        
        // Adicionar listeners para temas
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.applyTheme(btn.dataset.theme));
        });
        
        // Adicionar listener para toggle de tema escuro/claro
        this.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());
        this.victorySoundToggle.addEventListener('change', () => {
            this.isVictorySoundEnabled = this.victorySoundToggle.checked;
            this.saveState();
        });
        this.aiToggle.addEventListener('change', () => {
            this.isAIEnabled = this.aiToggle.checked;
            this.saveState();
        });
        
        // Fechar modal ao clicar fora
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });
        
        // Inicializar som de vitória
        this.initVictorySound();
        
        this.updateStatus();
        this.updateScores();
        this.updatePlayerDisplays();
        this.applyColors();
        this.applyDarkMode();
        
        // Marcar tema dark como ativo
        const darkThemeBtn = document.querySelector('[data-theme="dark"]');
        if (darkThemeBtn) {
            darkThemeBtn.classList.add('active');
        }
        this.loadState();
    }
    
    openSettings() {
        this.settingsModal.classList.add('active');
        // Atualizar valores dos inputs com as cores atuais
        this.colorXInput.value = this.colors.X;
        this.colorOInput.value = this.colors.O;
        this.boardBackgroundInput.value = this.boardBackground;
        
        // Sincronizar toggle de tema escuro/claro
        this.darkModeToggle.checked = this.isDarkMode;
        this.victorySoundToggle.checked = this.isVictorySoundEnabled;
        this.aiToggle.checked = this.isAIEnabled;
        
        // Marcar o tema ativo
        this.updateActiveTheme();
    }
    
    closeSettings() {
        this.settingsModal.classList.remove('active');
    }
    
    updateActiveTheme() {
        // Determinar qual tema está ativo baseado nas cores atuais
        this.themeButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Verificar se as cores atuais correspondem a algum tema
        const currentTheme = Object.keys(this.themes).find(themeName => {
            const theme = this.themes[themeName];
            return theme.colorX === this.colors.X && 
                   theme.colorO === this.colors.O && 
                   theme.boardBg === this.boardBackground;
        });
        
        if (currentTheme) {
            const activeBtn = document.querySelector(`[data-theme="${currentTheme}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    }
    
    updateColors() {
        this.colors.X = this.colorXInput.value;
        this.colors.O = this.colorOInput.value;
        this.applyColors();
    }
    
    updateBoardBackground() {
        this.boardBackground = this.boardBackgroundInput.value;
        this.applyColors();
    }
    
    applyColors() {
        document.documentElement.style.setProperty('--color-x', this.colors.X);
        document.documentElement.style.setProperty('--color-o', this.colors.O);
        document.documentElement.style.setProperty('--board-bg', this.boardBackground);
    }
    
    toggleDarkMode() {
        this.isDarkMode = this.darkModeToggle.checked;
        this.applyDarkMode();
    }
    
    applyDarkMode() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    initVictorySound() {
        this.audioElement = new Audio('vitoria.mp3');
        this.audioElement.load();
        // Desbloquear áudio no primeiro clique/touch
        const unlock = () => {
            this.audioElement.play().catch(() => {});
            document.body.removeEventListener('click', unlock);
            document.body.removeEventListener('touchstart', unlock);
        };
        document.body.addEventListener('click', unlock);
        document.body.addEventListener('touchstart', unlock);
        this.victorySound = () => {
            this.audioElement.currentTime = 0;
            this.audioElement.play().catch((e) => {
                alert('Não foi possível reproduzir o áudio de vitória. Verifique se o arquivo vitoria.mp3 está presente e se o navegador permite áudio.');
            });
        };
    }
    
    playVictorySound() {
        if (this.victorySound && this.isVictorySoundEnabled) {
            this.victorySound();
        }
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (theme) {
            this.colors.X = theme.colorX;
            this.colors.O = theme.colorO;
            this.boardBackground = theme.boardBg;
            
            // Atualizar inputs se o modal estiver aberto
            if (this.settingsModal.classList.contains('active')) {
                this.colorXInput.value = this.colors.X;
                this.colorOInput.value = this.colors.O;
                this.boardBackgroundInput.value = this.boardBackground;
            }
            
            // Atualizar botões de tema
            this.themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.theme === themeName) {
                    btn.classList.add('active');
                }
            });
            
            this.applyColors();
        }
    }
    
    updatePlayerNames() {
        this.playerNames.X = this.playerXInput.value.trim() || 'Jogador X';
        this.playerNames.O = this.playerOInput.value.trim() || 'Jogador O';
        this.updatePlayerDisplays();
        this.updateStatus();
    }
    
    updatePlayerDisplays() {
        this.playerXDisplay.textContent = this.playerNames.X;
        this.playerODisplay.textContent = this.playerNames.O;
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        this.saveState();
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            // Se modo IA estiver ativado e for a vez do O, faz jogada automática
            if (this.isAIEnabled && this.currentPlayer === 'O' && this.gameActive) {
                setTimeout(() => this.computerMove(), 500);
            }
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
    
    createFireworks(winner) {
        const container = document.querySelector('.container');
        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'fireworks-container';
        container.appendChild(fireworksContainer);
        
        // Criar múltiplas partículas
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createFireworkParticle(fireworksContainer, winner);
            }, i * 100);
        }
        
        // Remover o container após a animação
        setTimeout(() => {
            if (fireworksContainer.parentNode) {
                fireworksContainer.parentNode.removeChild(fireworksContainer);
            }
        }, 5000);
    }
    
    createFireworkParticle(container, winner) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.textContent = winner;
        particle.style.color = this.colors[winner];
        
        // Posição aleatória
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        container.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.saveState();
        
        // Destacar células vencedoras
        this.winningConditions.forEach(condition => {
            if (condition.every(index => this.board[index] === this.currentPlayer)) {
                condition.forEach(index => {
                    this.cells[index].classList.add('winning');
                });
            }
        });
        
        const winnerName = this.playerNames[this.currentPlayer];
        this.statusElement.textContent = `${winnerName} venceu!`;
        this.statusElement.style.background = '#c6f6d5';
        this.statusElement.style.color = '#22543d';
        
        // Tocar som de vitória
        this.playVictorySound();
        
        // Criar efeito de fogos
        this.createFireworks(this.currentPlayer);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.saveState();
        this.statusElement.textContent = 'Empate!';
        this.statusElement.style.background = '#fed7d7';
        this.statusElement.style.color = '#742a2a';
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        const currentPlayerName = this.playerNames[this.currentPlayer];
        this.statusElement.textContent = `Vez de ${currentPlayerName}`;
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
        this.saveState();
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }

    computerMove() {
        // IA simples: escolhe uma célula vazia aleatória
        const emptyCells = this.board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
        if (emptyCells.length === 0) return;
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.handleCellClick(move);
    }

    saveState() {
        const state = {
            board: this.board,
            currentPlayer: this.currentPlayer,
            scores: this.scores,
            playerNames: this.playerNames,
            colors: this.colors,
            boardBackground: this.boardBackground,
            isDarkMode: this.isDarkMode,
            isVictorySoundEnabled: this.isVictorySoundEnabled,
            isAIEnabled: this.isAIEnabled
        };
        localStorage.setItem('jogoVelhaState', JSON.stringify(state));
    }

    loadState() {
        const state = JSON.parse(localStorage.getItem('jogoVelhaState'));
        if (!state) return;
        this.board = state.board || ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = state.currentPlayer || 'X';
        this.scores = state.scores || { X: 0, O: 0 };
        this.playerNames = state.playerNames || { X: 'Jogador X', O: 'Jogador O' };
        this.colors = state.colors || { X: '#ff6b6b', O: '#4ecdc4' };
        this.boardBackground = state.boardBackground || '#2d3748';
        this.isDarkMode = state.isDarkMode !== undefined ? state.isDarkMode : true;
        this.isVictorySoundEnabled = state.isVictorySoundEnabled !== undefined ? state.isVictorySoundEnabled : true;
        this.isAIEnabled = state.isAIEnabled !== undefined ? state.isAIEnabled : false;

        // Restaurar inputs visuais
        this.playerXInput.value = this.playerNames.X;
        this.playerOInput.value = this.playerNames.O;
        this.colorXInput.value = this.colors.X;
        this.colorOInput.value = this.colors.O;
        this.boardBackgroundInput.value = this.boardBackground;
        this.darkModeToggle.checked = this.isDarkMode;
        this.victorySoundToggle.checked = this.isVictorySoundEnabled;
        this.aiToggle.checked = this.isAIEnabled;
        this.applyColors();
        this.applyDarkMode();
        this.updatePlayerDisplays();
        this.updateScores();
        this.updateStatus();
        // Restaurar tabuleiro
        this.cells.forEach((cell, i) => {
            cell.textContent = this.board[i];
            cell.classList.remove('x', 'o', 'winning');
            if (this.board[i] === 'X') cell.classList.add('x');
            if (this.board[i] === 'O') cell.classList.add('o');
        });
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 