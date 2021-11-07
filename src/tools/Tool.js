export default class Tool {
  constructor(canvas, socket, sessionId) {
    this.canvas = canvas
    this.socket = socket
    this.sessionId = sessionId
    this.ctx = canvas.getContext('2d')
    this.destroyListeners()
  }

  set strokeColor(color) {
    this.ctx.fillStyle = color
  }

  set brushSize(width) {
    this.ctx.fillStyle = width
  }

  destroyListeners() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}