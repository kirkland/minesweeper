import { useState } from "react";

import Row from "./Row";

const initializeBoard = (rows, columns, bombs) => {
  let board = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    board.push(new Array(columns).fill("unknown"));
  }

  for (let i = 0; i <= bombs; i++) {
    const bombRow = Math.floor(Math.random() * rows);
    const bombColumn = Math.floor(Math.random() * columns);

    board[bombRow][bombColumn] = "bomb";
  }

  return board;
};

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const [board, updateBoard] = useState(initializeBoard(rows, columns, bombs));

  const onClick = (row, column) => {
    updateBoard((board) => {
      const newBoard = [];

      board.forEach((row) => {
        return newBoard.push([...row]);
      });

      newBoard[row][column] = "clicked";
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
