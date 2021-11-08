import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseDownHandler(event) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
  }

  mouseUpHandler(event) {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'finish',
      }
    }))
  }

  mouseMoveHandler(event) {
    if(this.mouseDown) {
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.sessionId,
        figure: {
          type: 'brush',
          x: event.pageX - event.target.offsetLeft,
          y: event.pageY - event.target.offsetTop,
        }
      }))
    }
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}