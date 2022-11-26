import { effect } from './effect.js'

export function watch (source, cb, options = {}) {
  let newValue, oldValue // 存储新值和旧值
  const getter = typeof source === 'function'
               ? source
               : () => traverse(source)

  const effectFn = effect(
    getter,
    {
      lazy: true, // 懒执行，使得能够在外部获得getter返回的值
      scheduler: job
    }
  )

  if (options.immediate) job()
  else oldValue = effectFn()

  function job () { // 执行回调函数并获取newValue和oldValue
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }

  function traverse (source, seen = new Set()) { // 遍历访问监听的变量的属性，触发依赖收集
    if (typeof source !== 'object' || source === null || seen.has(source)) return

    seen.add(source)
    for (const key in source) {
      traverse(source[key], seen)
    }

    return source
  }
}