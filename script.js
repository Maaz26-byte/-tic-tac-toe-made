const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

// This array stores the board state (9 positions)
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations (indexes)
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      isGameActive = false;
      statusText.textContent = `Player ${board[a]} wins! 🎉`;
      return;
    }
  }

  // Draw check
  if (!board.includes("")) {
    isGameActive = false;
    statusText.textContent = "It's a draw! 😄";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  // If already filled or game ended, do nothing
  if (board[index] !== "" || !isGameActive) return;

  // Update board + UI
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.disabled = true;

  // Check win/draw
  checkWinner();

  // Switch player if game still active
  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = "Player X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
  });
}

// Add click listeners to each cell
cells.forEach((cell) => cell.addEventListener("click", handleClick));

// Restart button
resetBtn.addEventListener("click", resetGame)