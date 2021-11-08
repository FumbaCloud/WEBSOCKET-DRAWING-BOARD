const {makeAutoObservable} = require("mobx")

class ModalState {
  opened = true

  constructor() {
    makeAutoObservable(this)
  }

  setModalState(state) {
    this.opened = state
  }
}

export default new ModalState()