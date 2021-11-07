const {makeAutoObservable} = require("mobx");

class SessionState {
  socket = null
  sessionId = null

  constructor() {
    makeAutoObservable(this)
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(id) {
    this.sessionId = id
  }
}

export default new SessionState()