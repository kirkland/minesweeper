import { useState } from "react";

import Row from "./Row";
import BoardState from "../board-state";

const setAdjacentBombs = (board, coordinates) => {
  const rows = board.length;
  const columns = board[0].length;

  [
    [1, 0],
    [1, 1],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ].forEach((offsets) => {
    const adjacentCoordinates = [
      coordinates[0] + offsets[0],
      coordinates[1] + offsets[1],
    ];

    if (
      0 <= adjacentCoordinates[0] &&
      adjacentCoordinates[0] < rows &&
      0 <= adjacentCoordinates[1] &&
      adjacentCoordinates[1] < columns
    ) {
      const adjacentCell =
        board[adjacentCoordinates[0]][adjacentCoordinates[1]];

      adjacentCell.adjacentBombs = adjacentCell.adjacentBombs + 1;
    }
  });
};

const initializeBoard = (rows, columns, bombs) => {
  let board = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      row.push({ adjacentBombs: 0, revealed: false });
    }

    board.push(row);
  }

  for (let i = 0; i <= bombs; i++) {
    const bombRow = Math.floor(Math.random() * rows);
    const bombColumn = Math.floor(Math.random() * columns);

    board[bombRow][bombColumn].bomb = true;
    setAdjacentBombs(board, [bombRow, bombColumn]);
  }

  return board;
};

const cloneBoard = (board) => {
  const newBoard = [];

  board.forEach((row) => {
    const newRow = [];

    row.forEach((cell) => {
      const newCell = Object.assign({}, cell);
      newRow.push(newCell);
    });

    newBoard.push(newRow);
  });

  return newBoard;
};

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  // const [board, updateBoard] = useState(initializeBoard(rows, columns, bombs));

  const [board, updateBoard] = useState(
    BoardState.createInitialBoard(rows, columns, bombs).board
  );

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
