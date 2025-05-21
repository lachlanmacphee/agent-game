/**
 * Initialize an empty game board
 * @param {number} size - Size of the board (size x size)
 * @returns {Array} - 2D array representing the board
 */
export const initializeBoard = (size) => {
  return Array(size)
    .fill()
    .map(() =>
      Array(size)
        .fill()
        .map(() => ({
          hasShip: false,
          isHit: false,
          shipId: null,
        }))
    );
};

/**
 * Check if a ship can be placed at the specified position
 * @param {Array} board - The game board
 * @param {number} row - Starting row
 * @param {number} col - Starting column
 * @param {number} size - Size of the ship
 * @param {boolean} isHorizontal - Ship orientation
 * @returns {boolean} - Whether the ship can be placed
 */
const canPlaceShip = (board, row, col, size, isHorizontal) => {
  const boardSize = board.length;

  // Check if ship fits on the board
  if (isHorizontal) {
    if (col + size > boardSize) return false;
  } else {
    if (row + size > boardSize) return false;
  }

  // Check for collision with other ships (including adjacent cells)
  for (
    let i = Math.max(0, row - 1);
    i <= Math.min(boardSize - 1, row + (isHorizontal ? 1 : size));
    i++
  ) {
    for (
      let j = Math.max(0, col - 1);
      j <= Math.min(boardSize - 1, col + (isHorizontal ? size : 1));
      j++
    ) {
      if (board[i][j].hasShip) return false;
    }
  }

  return true;
};

/**
 * Place a ship on the board
 * @param {Array} board - The game board
 * @param {number} row - Starting row
 * @param {number} col - Starting column
 * @param {number} size - Size of the ship
 * @param {boolean} isHorizontal - Ship orientation
 * @param {string} shipId - ID of the ship
 * @returns {Array} - Updated board with the ship placed
 */
const placeShip = (board, row, col, size, isHorizontal, shipId) => {
  const newBoard = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < size; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    newBoard[r][c] = {
      hasShip: true,
      isHit: false,
      shipId,
    };
  }

  return newBoard;
};

/**
 * Place ships randomly on the board
 * @param {Array} board - The game board
 * @param {Array} ships - Array of ship objects with name and size
 * @returns {Array} - Updated board with ships placed
 */
export const placeShipsRandomly = (board, ships) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  const boardSize = board.length;

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      // Random position and orientation
      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);
      const isHorizontal = Math.random() > 0.5;

      if (canPlaceShip(newBoard, row, col, ship.size, isHorizontal)) {
        newBoard = placeShip(
          newBoard,
          row,
          col,
          ship.size,
          isHorizontal,
          ship.name
        );
        placed = true;
      }
    }
  });

  return newBoard;
};

/**
 * Check if the game is over (all ships are sunk)
 * @param {Array} board - The game board
 * @returns {boolean} - Whether the game is over
 */
export const checkGameOver = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      // If there's a ship that hasn't been hit, the game is not over
      if (board[row][col].hasShip && !board[row][col].isHit) {
        return false;
      }
    }
  }
  // All ships have been hit
  return true;
};
