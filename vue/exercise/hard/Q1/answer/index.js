import { ref, createRefs, createNodeSetByType } from './hooks.js'
import { render } from './render.js'
import { bindEvent } from './event.js'

function createApp (el, { refs, methods }) {
  const $el = document.querySelector(el)
  const allNodes = $el.querySelectorAll('*')
  const { nodeShouldRender, nodeShouldBindEvent } = createNodeSetByType(allNodes)

  const refSet = createRefs(refs, nodeShouldRender) // 创建ref集合，内部进行依赖收集，建立ref和依赖之间的联系
  render(refSet) // 渲染
  bindEvent.call(refSet, nodeShouldBindEvent, methods) // 绑定事件处理函数，并修改this指向为refSet
}

export {
  createApp,
  ref
}
