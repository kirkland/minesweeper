export default function Cell(props) {
  const { state, row, column, onClick } = props;

  const clickHandler = (event) => {
    onClick(row, column);
  };

  let cellClass = "";

  if (state.revealed) {
    cellClass = "cell-revealed";

    if (state.bomb) {
      cellClass = "cell-revealed-bomb";
    }
  }

  return (
    <td className={`cell ${cellClass}`} onClick={clickHandler}>
      {state.revealed && state.adjacentBombs}
    </td>
  );
}
