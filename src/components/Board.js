import { useState } from "react";

import Row from "./Row";
import {
  cloneBoard,
  createInitialBoard,
  gameLost,
  gameWon,
  reveal,
} from "../board-state";

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const [board, updateBoard] = useState(
    createInitialBoard(rows, columns, bombs)
  );

  const onClick = (row, column) => {
    updateBoard((board) => {
      const newBoard = cloneBoard(board);
      reveal(newBoard, row, column);
      return newBoard;
    });
  };

  return (
    <>
      {gameLost(board) && <p>Sorry, you lost.</p>}
      {gameWon(board) && <p>Hurray, you won!</p>}
      <table className="board">
        <tbody>
          {board.map((row, rowIndex) => (
            <Row
              row={row}
              key={rowIndex}
              rowIndex={rowIndex}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
