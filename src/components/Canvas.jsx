import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import modalState from "../store/modalState";
import {useParams} from "react-router-dom";
import sessionState from "../store/sessionState";

const Canvas = observer(props => {

  const canvasRef = useRef()
  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  },[])

  useEffect(() => {
    if(modalState.username) {
      const socket =  new WebSocket('ws://localhost:5000')

      sessionState.setSocket(socket)
      sessionState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: modalState.username,
          method: 'connection'
        }))
      }
      socket.onmessage = (event) => {
        let message = JSON.parse(event.data)

        switch(message.method) {
          case 'connection':
            console.log(`User ${message.username} connected`)
            break
          case 'draw':
            drawHandler(message)
            break
        }
      }
    }
  },[modalState.username])



  const mouseDownHandler = () => {
    canvasState.pushUndo(canvasRef.current.toDataURL())
  }

  const drawHandler = (message) => {
    const figure = message.figure
    const ctx = canvasRef.current.getContext('2d')

    switch(figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'finish':
        Brush.draw(ctx, figure.x, figure.y)
        break
    }
  }

  return (
    <>
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={props.width} height={props.height} />
    </>
  );
});

export default Canvas;