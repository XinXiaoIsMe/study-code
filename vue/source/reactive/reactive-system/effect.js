import {
  activeEffect,
  effectStack
} from './deps.js'

export function effect (fn, options = {}) {
  const effectFn = function () {
    cleanup(effectFn) // 每次执行副作用函数的时候清除相应依赖
    activeEffect.value = effectFn
    effectStack.push(effectFn) // 使用栈防止effect嵌套时内层的effect执行后覆盖了activeEffect
    const res = fn()
    effectStack.pop()
    activeEffect.value = effectStack.at(-1) // 还原为外层的副作用函数
    return res
  }
  effectFn.deps = [] // 用于保存和effectFn相关的依赖集合
  effectFn.options = options // 保存options用于调度
  if (options.lazy) {
    return effectFn
  } else {
    effectFn()
  }
}

function cleanup (effectFn) {
  const deps = effectFn.deps
  deps.forEach(depSet => depSet.delete(effectFn)) // 将当前依赖从依赖集合中删除
  deps.length = 0 // 重置
}
