document.addEventListener("DOMContentLoaded", () => {
    const colorsArray = [
        '#FF5733', '#33FF57', '#5733FF', '#FF33A1',
        '#33FFF6', '#FFA733', '#33C2FF', '#A133FF'
    ];

    let gameColors = [];
    let score = 0;
    let moves = 0;
    let matchedPairs = 0;
    const scoreElement = document.getElementById('score');
    const movesElement = document.getElementById('moves');
    const winMessage = document.getElementById('win-message');
    const gameContainer = document.querySelector('.memory-game');
    const resetButton = document.getElementById('reset-btn');

    function initGame() {
        gameColors = [...colorsArray, ...colorsArray];
        shuffleArray(gameColors);
        score = 0;
        moves = 0;
        matchedPairs = 0;
        scoreElement.textContent = score;
        movesElement.textContent = moves;
        winMessage.style.display = 'none';
        gameContainer.innerHTML = '';
        generateCards();
        resetBoard();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateCards() {
        gameColors.forEach(color => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.color = color;

            cardElement.innerHTML = `
                <div class="front-face" style="background-color: ${color};"></div>
                <div class="back-face"></div>
            `;

            gameContainer.appendChild(cardElement);
            cardElement.addEventListener('click', flipCard);
        });
    }

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        moves++;
        movesElement.textContent = moves;

        const isMatch = firstCard.dataset.color === secondCard.dataset.color;

        if (isMatch) {
            disableCards();
            updateScore();
            launchConfetti();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs++;
        if (matchedPairs === colorsArray.length) {
            winMessage.style.display = 'block';
        }

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateScore() {
        score += 10;
        scoreElement.textContent = score;
    }

    resetButton.addEventListener('click', initGame);

    initGame();
});
