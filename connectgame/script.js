const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = 'red';
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Initialize board
function initBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      board[r][c] = null;
      boardEl.appendChild(cell);
    }
  }
}

// Drop disc into column
function dropDisc(col) {
  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
      cell.classList.add(currentPlayer);
      if (checkWin(r, col)) {
        statusEl.textContent = `🎉 ${currentPlayer === 'red' ? 'Player 1' : 'Player 2'} Wins!`;
        boardEl.style.pointerEvents = 'none';
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        statusEl.textContent = `${currentPlayer === 'red' ? "Player 1's Turn (🔴)" : "Player 2's Turn (🟡)"}`;
      }
      break;
    }
  }
}

// Win check
function checkWin(r, c) {
  return (
    checkDir(r, c, 0, 1) || // horizontal
    checkDir(r, c, 1, 0) || // vertical
    checkDir(r, c, 1, 1) || // diagonal right
    checkDir(r, c, 1, -1)   // diagonal left
  );
}

function checkDir(r, c, dr, dc) {
  let count = 1;
  count += countCells(r, c, dr, dc);
  count += countCells(r, c, -dr, -dc);
  return count >= 4;
}

function countCells(r, c, dr, dc) {
  let count = 0;
  let player = board[r][c];
  for (let i = 1; i < 4; i++) {
    let nr = r + dr * i;
    let nc = c + dc * i;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== player) break;
    count++;
  }
  return count;
}

// Events
boardEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    const col = parseInt(e.target.dataset.col);
    dropDisc(col);
  }
});

resetBtn.addEventListener('click', () => {
  currentPlayer = 'red';
  statusEl.textContent = "Player 1's Turn (🔴)";
  boardEl.style.pointerEvents = 'auto';
  initBoard();
});

initBoard();
