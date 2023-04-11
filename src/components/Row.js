import Cell from "./Cell";

export default function Row(props) {
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
