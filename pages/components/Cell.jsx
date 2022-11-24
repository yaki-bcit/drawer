export default function Cell({ 
    cell={value: "FFFFFF"}, 
    onClick 
}) {
  function handleClick() {
    onClick(cell);
  }

  return (
    <div
      className="cell"
      style={{
        minWidth: "20px",
        minHeight: "20px",
        backgroundColor: `#${cell.value}`,
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
}