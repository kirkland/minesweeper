const adjacentCells = (board, row, column) => {
  const rows = board.length;
  const columns = board[0].length;

  return [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ]
    .map((offsets) => {
      const [rowOffset, columnOffset] = offsets;
      const adjacentRow = row + rowOffset;
      const adjacentColumn = column + columnOffset;

      if (
        0 <= adjacentRow &&
        adjacentRow < rows &&
        0 <= adjacentColumn &&
        adjacentColumn < columns
      ) {
        return [adjacentRow, adjacentColumn];
      }

      return null;
    })
    .filter((x) => x);
};

export const cloneBoard = (board) => {
  const newBoard = [];

  board.forEach((row) => {
    const newRow = [];

    row.forEach((cell) => {
      newRow.push(Object.assign({}, cell));
    });

    newBoard.push(newRow);
  });

  return newBoard;
};

export const createInitialBoard = (rowsCount, columnsCount, bombs) => {
  const board = [];

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
      row.push({ adjacentBombs: 0, revealed: false });
    }

    board.push(row);
  }

  for (let i = 0; i <= bombs; i++) {
    const bombRow = Math.floor(Math.random() * rowsCount);
    const bombColumn = Math.floor(Math.random() * columnsCount);
    board[bombRow][bombColumn].bomb = true;
    setAdjacentBombs(board, bombRow, bombColumn);
  }

  return board;
};
export const reveal = (board, row, column) => {
  const cell = board[row][column];
  cell.revealed = true;

  if (cell.bomb) {
    // Game lost
  } else {
    if (cell.adjacentBombs === 0) {
      adjacentCells(board, row, column).forEach((coordinates) => {
        if (!board[coordinates[0]][coordinates[1]].revealed) {
          reveal(board, ...coordinates);
        }
      });
    }
  }
};

const setAdjacentBombs = (board, bombRow, bombColumn) => {
  adjacentCells(board, bombRow, bombColumn).forEach((coordinates) => {
    board[coordinates[0]][coordinates[1]].adjacentBombs =
      board[coordinates[0]][coordinates[1]].adjacentBombs + 1;
  });
};
