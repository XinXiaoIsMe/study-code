export default class Model {
  constructor () {
    this.value = 0
  }

  add (value) {
    this.value += value
  }

  minus (value) {
    this.value -= value
  }

  setValue (value) {
    this.value = Number(value)
  }

  static create () {
    if (!this.instance) {
      this.instance = new Model()
    }

    return this.instance
  }
}