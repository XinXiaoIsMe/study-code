import CounterView from './view.js'
import CounterModel from './model.js'
import Handler from './handler.js'

export default function (container) {
  const els = {
    addBtn: null,
    minusBtn: null,
    input: null
  }

  const model = CounterModel.create()

  const init = () => {
    render()
    bindEvent()
  }

  const render = () => {
    container.innerHTML += CounterView(model.value)
  }

  const update = () => {
    els.input.value = CounterModel.instance.value
  }

  const bindEvent = () => {
    els.addBtn = container.querySelector('.counter-add')
    els.minusBtn = container.querySelector('.counter-minus')
    els.input = container.querySelector('.counter-input')

    const {
      handleAdd,
      handleMinus,
      handleInputChange
    } = new Handler(model, update)

    els.addBtn.addEventListener('click', handleAdd, false)
    els.minusBtn.addEventListener('click', handleMinus, false)
    els.input.addEventListener('input', handleInputChange)
  }

  init()
}
