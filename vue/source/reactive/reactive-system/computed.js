import { effect } from './effect.js'
import { track, trigger } from './proxy.js'

export function computed (fn) {
  let dirty = true
  let cache

  const effectFn = effect(fn, {
    lazy: true,
    scheduler () {
      dirty = true
      trigger(obj, 'value')
    }
  })

  const obj = { // 计算属性不可以直接修改，因此暂时不需要set
    get value () {
      if (dirty) {
        dirty = false
        cache = effectFn()
      }
      track(obj, 'value')
      // 需要返回fn计算的结果
      return cache
    }
  }

  return obj
}
