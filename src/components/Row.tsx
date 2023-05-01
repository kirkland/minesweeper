import Cell from "./Cell";

import type { RowData } from "../board-state";

type RowProps = {
  row: RowData;
  rowIndex: number;
  onClick: Function
};

export default function Row(props: RowProps) {
  const { row, rowIndex, onClick } = props;

  return (
    <tr className="row">
      {row.map((cell, columnIndex) => (
        <Cell
          state={cell}
          key={columnIndex}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          onClick={onClick}
        />
      ))}
    </tr>
  );
}
