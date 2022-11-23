import { ref, createRefs } from './hooks.js'
import { render } from './render.js'
import { bindEvent } from './event.js'

function createApp (el, { refs, methods }) {
  const $el = document.querySelector(el)
  const allNodes = $el.querySelectorAll('*')

  const refSet = createRefs(refs, allNodes) // 创建ref集合，内部进行依赖收集，建立ref和依赖之间的联系
  render(refSet) // 渲染
  bindEvent.call(refSet, allNodes, methods) // 绑定事件处理函数，并修改this指向为refSet
}

export {
  createApp,
  ref
}
