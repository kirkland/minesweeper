import { useState } from "react";

import Row from "./Row";
import BoardState from "../board-state";

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const [board, updateBoard] = useState(
    BoardState.createInitialBoard(rows, columns, bombs).board
  );

  const onClick = (row, column) => {
    updateBoard((board) => {
      const boardState = new BoardState(board);
      boardState.reveal(row, column);
      return boardState.board;
    });
  };

  return (
    <table className="board">
      <tbody>
        {board.map((row, rowIndex) => (
          <Row row={row} key={rowIndex} rowIndex={rowIndex} onClick={onClick} />
        ))}
      </tbody>
    </table>
  );
}
