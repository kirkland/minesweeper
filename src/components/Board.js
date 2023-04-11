import { useState } from "react";

import Row from "./Row";

export default function Board(props) {
  const rows = 10;
  const columns = 10;

  const initialBoard = new Array(rows).fill(new Array(columns).fill("unknown"));

  const [board, updateBoard] = useState(initialBoard);

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
};
