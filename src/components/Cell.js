export default function Cell(props) {
  const { state, row, column, onClick } = props;

  const clickHandler = (event) => {
    onClick(row, column);
  }

  return (
    <div className={`cell cell-${state}`} onClick={clickHandler} />
  );
}