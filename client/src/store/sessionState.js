const {makeAutoObservable} = require("mobx");

class SessionState {
  socket = null
  sessionId = null
  username = ''



  constructor() {
    makeAutoObservable(this)
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(id) {
    this.sessionId = id
  }

  setUsername(username) {
    this.username = username
  }
}

export default new SessionState()