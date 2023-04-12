import { useState } from "react";

import Row from "./Row";
import BoardState from "../board-state";

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
