import { useState, useEffect, useRef, useCallback } from 'react'
import Pusher from "pusher-js"

import Cell from "./Cell"

export default function Grid({
  handleClick
}) {
  let pusher = useRef()

  const cells = []
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      cells.push({
        id: `${x}-${y}`,
        //x: x,
        //y: y,
        value: "FFFFFF",
      })
    }
  }
  const [grid, setGrid] = useState(cells)

  const onPusherEvent = useCallback((data) => {
    const newGrid = grid.map((cell) => {
      if (cell.id === data.cell.id) {
        return { ...cell, value: data.cell.value }
      } else {
        return { ...cell }
      }
    })
    setGrid(newGrid)
  }, [grid])

  useEffect(() => {
    pusher.current = new Pusher('11556dc9c381feb5b9f7', {
      cluster: 'us3',
      encrypted: true
    })
    const channel = pusher.current.subscribe('drawer-channel')
    channel.bind("drawer-event", async (data) => {
      onPusherEvent(data)
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [onPusherEvent])
  
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