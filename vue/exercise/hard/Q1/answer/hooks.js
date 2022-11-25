import { update } from './render.js'
import { nodeTypes } from './utils.js'
const reg_var = /\{\{(.*?)\}\}/

class Ref {
  constructor (initialValue) {
    this._value = initialValue
    this._initialValue = initialValue // 保存初始值用于重置
    this.deps = new Set() // 将依赖收集起来，建立依赖和数据之间的联系
  }

  get value () {
    return this._value
  }

  set value (newValue) {
    this._value = newValue
    update(this) // 依赖更新
  }

  $reset () {
    this.value = this._initialValue // 重置为初始值
  }
}

export function ref (initialValue) {
  return new Ref(initialValue)
}

export function createNodeSetByType (nodes) {
  const nodeShouldRender = []
  const nodeShouldBindEvent = []

  nodes.forEach(node => {
    if (nodeTypes.shouldRender(node)) {
      nodeShouldRender.push(node)
    } else if (nodeTypes.shouldBindEvent(node)) {
      nodeShouldBindEvent.push(node)
    }
  })

  return {
    nodeShouldRender,
    nodeShouldBindEvent
  }
}

// 创建完成依赖收集后的ref集合
export function createRefs (refs, nodes) {
  nodes.forEach(node => {
    const textContent = node.textContent
    const refKey = textContent.match(reg_var)[1].trim()
    refs[refKey].deps.add(node) // 依赖收集
  })

  return refs
}
