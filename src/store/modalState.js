const {makeAutoObservable} = require("mobx");

class ModalState {
  username = ''

  constructor() {
    makeAutoObservable(this)
  }

  setUsername(username) {
    this.username = username
  }
}

export default new ModalState()