export default class BoardState {
  constructor(board) {
    const newBoard = [];

    board.forEach((row) => {
      const newRow = [];

      row.forEach((cell) => {
        const newCell = Object.assign({}, cell);
        newRow.push(newCell);
      });

      newBoard.push(newRow);
    });

    this.board = newBoard;
    this.rows = board.length;
    this.columns = board[0].length;
  }

  static createInitialBoard(rowsCount, columnsCount, bombs) {
    let board = [];

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const row = [];

      for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
        row.push({ adjacentBombs: 0, revealed: false });
      }

      board.push(row);
    }

    let boardState = new BoardState(board);

    for (let i = 0; i <= bombs; i++) {
      const bombRow = Math.floor(Math.random() * boardState.rows);
      const bombColumn = Math.floor(Math.random() * boardState.columns);
      const cell = boardState.cell(bombRow, bombColumn);
      cell.bomb = true;
      boardState.setAdjacentBombs(bombRow, bombColumn);
    }

    return boardState;
  }

  cell(row, column) {
    return this.board[row][column];
  }

  reveal(row, column) {
    this.cell(row, column).revealed = true;
  }

  setAdjacentBombs(bombRow, bombColumn) {
    [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ].forEach((offsets) => {
      const [rowOffset, columnOffset] = offsets;
      const adjacentRow = bombRow + rowOffset;
      const adjacentColumn = bombColumn + columnOffset;

      if (
        0 <= adjacentRow &&
        adjacentRow < this.rows &&
        0 <= adjacentColumn &&
        adjacentColumn < this.columns
      ) {
        const adjacentCell = this.cell(adjacentRow, adjacentColumn);

        adjacentCell.adjacentBombs = adjacentCell.adjacentBombs + 1;
      }
    });
  }
}
