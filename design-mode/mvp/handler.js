export default class Handler {
  constructor (model, update) {
    this.model = model
    this.update = update
  }

  handleAdd = () => {
    this.model.add(1)
    this.update()
  }
  
  handleMinus = () => {
    this.model.minus(1)
    this.update()
  }
  
  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    this.model.setValue(value)
  }
}
