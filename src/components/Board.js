import { useState } from "react";

import Row from "./Row";
import {
  createInitialBoard,
  flag,
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

  const onClick = (button, row, column) => {
    updateBoard((board) => {
      if (button === "left") {
        return reveal(board, row, column);
      } else if (button === "right") {
        return flag(board, row, column);
      }
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
