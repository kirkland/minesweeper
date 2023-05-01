export type CellData = {
  adjacentBombs: number;
  bomb?: boolean;
  flagged?: boolean;
  revealed: boolean;
};

export type RowData = Array<CellData>;
export type Coordinate = Array<number>;

export class BoardState {
  rows: RowData[];
  private rowsCount: number;
  private columnsCount: number;

  constructor(rows: RowData[]) {
    this.rows = rows;
    this.rowsCount = rows.length;
    this.columnsCount = rows[0].length;
  }

  static createInitialBoard(
    rowsCount: number,
    columnsCount: number,
    bombs: number
  ) {
    const rows: Array<RowData> = [];

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const row: RowData = [];

      for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
        row.push({ adjacentBombs: 0, revealed: false });
      }

      rows.push(row);
    }

    const board = new BoardState(rows);

    for (let i = 0; i < bombs; i++) {
      board.addRandomBomb();
    }

    return board;
  }

  clone() {
    const newRows: Array<RowData> = [];

    this.rows.forEach((row) => {
      const newRow: RowData = [];

      row.forEach((cell) => {
        newRow.push(Object.assign({}, cell));
      });

      newRows.push(newRow);
    });

    return new BoardState(newRows);
  }

  flag(rowIndex: number, columnIndex: number) {
    const newBoard = this.clone();
    newBoard.rows[rowIndex][columnIndex].flagged =
      !newBoard.rows[rowIndex][columnIndex].flagged;
    return newBoard;
  }

  gameLost() {
    let lost = false;

    this.rows.forEach((row) => {
      row.forEach((cell) => {
        if (cell.bomb && cell.revealed) {
          lost = true;
        }
      });
    });

    return lost;
  }

  gameWon() {
    let won = true;

    this.rows.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.revealed && !cell.bomb) {
          won = false;
        }
      });
    });

    return won;
  }

  reveal(rowIndex: number, columnIndex: number): Coordinate[] {
    const cell = this.rows[rowIndex][columnIndex];
    cell.revealed = true;
    const nextRevealed: Coordinate[] = [];

    if (!cell.bomb && cell.adjacentBombs === 0) {
      this.adjacentCells(rowIndex, columnIndex).forEach((coordinates) => {
        if (!this.rows[coordinates[0]][coordinates[1]].revealed) {
          nextRevealed.push(coordinates);
        }
      });
    }

    return nextRevealed;
  }

  private addRandomBomb() {
    let bombRow: number, bombColumn: number;

    while (true) {
      bombRow = Math.floor(Math.random() * this.rowsCount);
      bombColumn = Math.floor(Math.random() * this.columnsCount);

      if (!this.rows[bombRow][bombColumn].bomb) {
        this.rows[bombRow][bombColumn].bomb = true;
        break;
      }
    }

    this.setAdjacentBombs(bombRow, bombColumn);
  }

  private adjacentCells(row: number, column: number) {
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
        adjacentRow < this.rowsCount &&
        0 <= adjacentColumn &&
        adjacentColumn < this.columnsCount
      ) {
        return [adjacentRow, adjacentColumn];
      }

      return null;
    });

    const adjacentCells: Array<Coordinate> = adjacentCellsIncludingNull.filter(
      (coordinate): coordinate is Exclude<typeof coordinate, null> =>
        !!coordinate
    );

    return adjacentCells;
  }

  private setAdjacentBombs(bombRow: number, bombColumn: number) {
    this.adjacentCells(bombRow, bombColumn).forEach((coordinates) => {
      this.rows[coordinates[0]][coordinates[1]].adjacentBombs =
        this.rows[coordinates[0]][coordinates[1]].adjacentBombs + 1;
    });
  }
}
