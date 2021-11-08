import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {useParams} from "react-router-dom";
import sessionState from "../store/sessionState";
import axios from "axios";

const Canvas = observer(props => {

  const canvasRef = useRef()
  const params = useParams()

  let sessionUsername = sessionState.username

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    let ctx = canvasRef.current.getContext('2d')
    axios.get(`http://localhost:5000/image?id=${params.id}`)
      .then(response => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      })
  },[params.id])

  useEffect(() => {
    if(sessionState.username) {
      const socket =  new WebSocket('ws://localhost:5000/')

      sessionState.setSocket(socket)
      sessionState.setSessionId(params.id)

      toolState.setTool(new Brush(canvasRef.current, socket, params.id))

      socket.onopen = () => {
        console.log('Successful connected')
        socket.send(JSON.stringify({
          id: params.id,
          username: sessionState.username,
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
          default:
            console.log('Unexpected onmessage method')
        }
      }
    }
  },[sessionUsername ,params.id])

  const mouseUpHandler = () => {
    axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
      .then(response => console.log(response.data))
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const drawHandler = (message) => {
    const figure = message.figure
    const ctx = canvasRef.current.getContext('2d')

    switch(figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'finish':
        ctx.beginPath()
        break
      default:
        console.log('Unexpected figure type')
    }
  }

  return (
    <>
      <canvas
        onMouseUp={() => mouseUpHandler()} onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={props.width} height={props.height} />
    </>
  );
});

export default Canvas;