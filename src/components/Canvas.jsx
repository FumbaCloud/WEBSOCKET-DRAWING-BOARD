import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(props => {

  const canvasRef = useRef()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
  },[])

  const mouseDownHandler = () => {
    canvasState.pushUndo(canvasRef.current.toDataURL())
  }

  return (
    <>
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={props.width} height={props.height} />
    </>
  );
});

export default Canvas;