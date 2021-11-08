export default class Tool {
  constructor(canvas, socket, sessionId) {
    this.canvas = canvas
    this.socket = socket
    this.sessionId = sessionId
    this.ctx = canvas.getContext('2d')
    this.destroyListeners()
  }

z

  destroyListeners() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}