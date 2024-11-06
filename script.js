document.addEventListener('DOMContentLoaded', function() {
  const toggleCheckbox = document.getElementById('toggle');
  const workExperience = document.querySelector('.work-experience');
  const education = document.querySelector('.education');

  // Function to toggle sections based on checkbox state
  function toggleSections() {
    if (toggleCheckbox.checked) {
      // If checked, show education and hide work
      workExperience.classList.remove('active');
      education.classList.add('active');
    } else {
      // If unchecked, show work and hide education
      workExperience.classList.add('active');
      education.classList.remove('active');
    }
  }

  // Initial setup: set the initial visibility based on checkbox state
  toggleSections();

  // Event listener for checkbox
  toggleCheckbox.addEventListener('change', toggleSections);
});

// Toggle Light/Dark Mode
document.getElementById('theme-toggle').addEventListener('click', function() {
  const body = document.body;
  const icon = this.querySelector('i');
  
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
      icon.classList.remove('bi-brightness-high');
      icon.classList.add('bi-moon-stars');
  } else {
      icon.classList.remove('bi-moon-stars');
      icon.classList.add('bi-brightness-high');
  }
});

// Ensuring `hero-image` is clickable
const modal = document.getElementById('tic-tac-toe-modal');
const heroImage = document.getElementById('hero-image');
const closeModal = document.getElementById('close-modal');

// Show the modal when the hero image is clicked
heroImage.onclick = function () {
  modal.style.display = 'flex';
};

// Close the modal when the close button is clicked
closeModal.onclick = function () {
  modal.style.display = 'none';
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Game variables
let currentPlayer = 'X'; // Player starts as 'X'
let board = Array(9).fill(null);
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let isPlayerTurn = true; // Flag to check if it's the player's turn

// Modify handleClick to include AI move
function handleClick(event) {
  if (!isPlayerTurn || checkWinner()) return; // Prevent move if it's AI's turn or game has ended

  const index = event.target.getAttribute('data-index');
  if (!board[index]) {
    // Player's move
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      return;
    } else if (board.every(cell => cell)) {
      statusText.textContent = "It's a Tie!";
      return;
    }

    // Switch to AI's turn
    currentPlayer = 'O';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    isPlayerTurn = false; // Set flag to AI's turn
    setTimeout(makeAIMove, 500); // Delay AI move for better user experience
  }
}

// Simple AI to make a move
function makeAIMove() {
  let move = findBestMove();
  if (move !== -1) {
    board[move] = currentPlayer;
    cells[move].textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
    } else if (board.every(cell => cell)) {
      statusText.textContent = "It's a Tie!";
    } else {
      // Switch back to player
      currentPlayer = 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
      isPlayerTurn = true; // Set flag to player's turn
    }
  }
}

// Find the best move for the AI
function findBestMove() {
  // Try to win
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = currentPlayer;
      if (checkWinner()) {
        board[i] = null; // Undo move
        return i;
      }
      board[i] = null; // Undo move
    }
  }
  // Block the player
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'X';
      if (checkWinner()) {
        board[i] = null; // Undo move
        return i;
      }
      board[i] = null; // Undo move
    }
  }
  // Choose a random available cell
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);
  return availableMoves.length > 0
    ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
    : -1;
}

// Check if there's a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Update the resetGame function to reset for both players
function resetGame() {
  board.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  isPlayerTurn = true; // Reset flag to player's turn
}

// Event listeners for game interaction
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initial status
statusText.textContent = `Player ${currentPlayer}'s Turn`;
