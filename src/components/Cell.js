export default function Cell(props) {
  const { state, row, column, onClick } = props;

  const clickHandler = (event) => {
    onClick(row, column);
  };

  let cellClass = "";

  if (state.revealed) {
    cellClass = "cell-revealed";
  } else if (state.bomb) {
    cellClass = "cell-bomb";
  }

  return (
    <div className={`cell ${cellClass}`} onClick={clickHandler}>
      {state.adjacentBombs}
    </div>
  );
}
