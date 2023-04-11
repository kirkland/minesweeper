import { useState } from "react";
import "./App.css";

function Cell(props) {
  const { state, row, column, onClick } = props;

  const clickHandler = (event) => {
    onClick(row, column);
  }

  return (
    <div className={`cell cell-${state}`} onClick={clickHandler} />
  );
}

function Row(props) {
  const { row, rowIndex, onClick } = props;

  return (
    <div className="row">
      {row.map((cell, column) => (
        <Cell
          state={cell}
          key={column}
          row={rowIndex}
          column={column}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function App() {
  const rows = 10;
  const columns = 10;

  let board = new Array(10);

  for (let row = 0; row < rows; row++) {
    board[row] = new Array(columns).fill("unknown");
  }

  const onClick = (row, column) => {
    console.log("clicked", row, column);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <Row row={row} key={rowIndex} rowIndex={rowIndex} onClick={onClick} />
      ))}
    </div>
  );
}

export default App;
