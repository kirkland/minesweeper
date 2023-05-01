import Cell from "./Cell";

import { Coordinate, RowData } from "../board-state";

type RowProps = {
  row: RowData;
  rowIndex: number;
  onClick: (button: string, coordinate: Coordinate) => void;
};

export default function Row(props: RowProps) {
  const { row, rowIndex, onClick } = props;

  return (
    <tr className="row">
      {row.map((cell, columnIndex) => (
        <Cell
          state={cell}
          key={columnIndex}
          coordinate={new Coordinate(rowIndex, columnIndex)}
          onClick={onClick}
        />
      ))}
    </tr>
  );
}
