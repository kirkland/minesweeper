export type CellData = {
  adjacentBombs: number;
  bomb?: boolean;
  flagged?: boolean;
  revealed: boolean;
};

export type RowData = Array<CellData>;
export type BoardState = Array<RowData>;
export type Coordinate = Array<number>;

const adjacentCells = (
  board: BoardState,
  row: number,
  column: number
): Array<Coordinate> => {
  const rows = board.length;
  const columns = board[0].length;

  const adjacentCellsIncludingNull: Array<Coordinate | null> = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ].map((offsets) => {
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
  });

  const adjacentCells: Array<Coordinate> = adjacentCellsIncludingNull.filter(
    (coordinate): coordinate is Exclude<typeof coordinate, null> => !!coordinate
  );

  return adjacentCells;
};

export const cloneBoard = (board: BoardState) => {
  const newBoard: BoardState = [];

  board.forEach((row) => {
    const newRow: RowData = [];

    row.forEach((cell) => {
      newRow.push(Object.assign({}, cell));
    });

    newBoard.push(newRow);
  });

  return newBoard;
};

export const createInitialBoard = (
  rowsCount: number,
  columnsCount: number,
  bombs: number
) => {
  const board: BoardState = [];

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const row: RowData = [];

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
        break;
      }
    }

    setAdjacentBombs(board, bombRow, bombColumn);
  }

  return board;
};

export const gameLost = (board: BoardState) => {
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

export const gameWon = (board: BoardState) => {
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

export const flag = (board: BoardState, row: number, column: number) => {
  const newBoard = cloneBoard(board);
  newBoard[row][column].flagged = !newBoard[row][column].flagged;
  return newBoard;
};

export const reveal = (
  newBoard: BoardState,
  row: number,
  column: number,
  clone = true
): Coordinate[] => {
  const cell = newBoard[row][column];
  cell.revealed = true;
  const nextRevealed: Coordinate[] = [];

  if (!cell.bomb && cell.adjacentBombs === 0) {
    adjacentCells(newBoard, row, column).forEach((coordinates) => {
      if (!newBoard[coordinates[0]][coordinates[1]].revealed) {
        nextRevealed.push(coordinates);
      }
    });
  }

  return nextRevealed;
};

const setAdjacentBombs = (
  board: BoardState,
  bombRow: number,
  bombColumn: number
) => {
  adjacentCells(board, bombRow, bombColumn).forEach((coordinates) => {
    board[coordinates[0]][coordinates[1]].adjacentBombs =
      board[coordinates[0]][coordinates[1]].adjacentBombs + 1;
  });
};
