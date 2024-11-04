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

// Tick-Tack-Toe Game
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

// Tic Tac Toe Game Logic
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (!board[index] && !checkWinner()) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
    } else if (board.every(cell => cell)) {
      statusText.textContent = "It's a Tie!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initial status
statusText.textContent = `Player ${currentPlayer}'s Turn`;
