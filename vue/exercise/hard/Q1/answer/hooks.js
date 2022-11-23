import { update } from './render.js'

const reg_var = /\{\{(.*?)\}\}/

export function ref (defaultValue) {
  const refWrapper = {
    _value: defaultValue,
    _defaultValue: defaultValue, // 保存初始值用于重置
    deps: new Set(), // 将依赖收集在refWrapper上，建立依赖和数据之间的联系
    $reset () {
      this.value = this._defaultValue // 重置为初始值
    }
  }

  Object.defineProperty(refWrapper, 'value', {
    get () {
      return this._value
    },
    set (newValue) {
      this._value = newValue
      update(this) // 更新依赖
    }
  })

  return refWrapper
}

// 创建完成依赖收集后的ref集合
export function createRefs (refs, nodes) {
  nodes.forEach(node => {
    const textContent = node.textContent
    if (reg_var.test(textContent)) { // 判断是否包含 {{}}，如果包含说明这个node节点需要作为依赖收集起来
      const refKey = textContent.match(reg_var)[1].trim()
      refs[refKey].deps.add(node) // 依赖收集
    }
  })

  return refs
}
