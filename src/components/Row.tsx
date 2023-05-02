import Cell from "./Cell";

import { Coordinate, RowData } from "../game-state";

type RowProps = {
  row: RowData;
  rowIndex: number;
  onClickCell: (button: string, coordinate: Coordinate) => void;
};

export default function Row(props: RowProps) {
  const { row, rowIndex, onClickCell } = props;

  return (
    <tr className="row">
      {row.map((cell, columnIndex) => (
        <Cell
          state={cell}
          key={columnIndex}
          coordinate={new Coordinate(rowIndex, columnIndex)}
          onClickCell={onClickCell}
        />
      ))}
    </tr>
  );
}
