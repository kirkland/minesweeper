import { useState } from "react";

import Row from "./Row";

const setAdjacentBombs = (board, coordinates) => {
  const rows = board.length;
  const columns = board[0].length;

  [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ].forEach((offsets) => {
    const adjacent = [coordinates[0] + offsets[0], coordinates[1] + offsets[1]];

    if (0 <= adjacent[0] <= rows && 0 <= adjacent[1] <= columns) {
      // Increment number of adjacent bombs
    }
  });
};

const initializeBoard = (rows, columns, bombs) => {
  let board = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    board.push(new Array(columns).fill({ revealed: false }));
  }

  for (let i = 0; i <= bombs; i++) {
    const bombRow = Math.floor(Math.random() * rows);
    const bombColumn = Math.floor(Math.random() * columns);

    board[bombRow][bombColumn] = { bomb: true };
  }

  return board;
};

const cloneBoard = (board) => {
  const newBoard = [];

  board.forEach((row) => {
    const newRow = [];

    row.forEach((cell => {
      const newCell = Object.assign({}, cell);
      newRow.push(newCell);
    }))

    newBoard.push(newRow);
  });

  return newBoard;
};

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const [board, updateBoard] = useState(initializeBoard(rows, columns, bombs));

  const onClick = (row, column) => {
    updateBoard((board) => {
      const newBoard = cloneBoard(board);
      newBoard[row][column].revealed = true;
      return newBoard;
    });
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <Row row={row} key={rowIndex} rowIndex={rowIndex} onClick={onClick} />
      ))}
    </div>
  );
}
