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

  for (let i = 0; i < bombs; i++) {
    let bombRow;
    let bombColumn;

    while (true) {
      bombRow = Math.floor(Math.random() * rowsCount);
      bombColumn = Math.floor(Math.random() * columnsCount);

      if (!board[bombRow][bombColumn].bomb) {
        board[bombRow][bombColumn].bomb = true;
        break
      }
    }

    setAdjacentBombs(board, bombRow, bombColumn);
  }

  return board;
};

export const gameLost = (board) => {
  let lost = false;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.bomb && cell.revealed) {
        lost = true;
      }
    });
  });

  return lost;
};

export const gameWon = (board) => {
  let won = true;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.revealed && !cell.bomb) {
        won = false;
      }
    });
  });

  return won;
};

export const flag = (board, row, column) => {
  const newBoard = cloneBoard(board);
  newBoard[row][column].flagged = !newBoard[row][column].flagged;
  return newBoard;
};

export const reveal = (board, row, column, clone = true) => {
  const newBoard = clone ? cloneBoard(board) : board;
  const cell = newBoard[row][column];
  cell.revealed = true;

  if (cell.adjacentBombs === 0) {
    adjacentCells(newBoard, row, column).forEach((coordinates) => {
      if (!newBoard[coordinates[0]][coordinates[1]].revealed) {
        reveal(newBoard, ...coordinates, false);
      }
    });
  }

  return newBoard;
};

const setAdjacentBombs = (board, bombRow, bombColumn) => {
  adjacentCells(board, bombRow, bombColumn).forEach((coordinates) => {
    board[coordinates[0]][coordinates[1]].adjacentBombs =
      board[coordinates[0]][coordinates[1]].adjacentBombs + 1;
  });
};
