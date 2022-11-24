import Cell from "./Cell"

export default function Grid({
  grid,
  handleClick
}) {
  if (grid) {
    console.log("grid", grid.slice(0, 5))
  }
  
  return (
    <div 
      className="board mt-8"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(20, 1fr)",
        gridTemplateRows: "repeat(20, 1fr)",
        gridGap: "0px",
        marginTop: "2em",
      }}
    >
      {grid && grid.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}