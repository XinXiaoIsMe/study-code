import {
  bucket,
  activeEffect
} from './deps.js'

export function createProxy (data) {
  return new Proxy(data, {
    get,
    set
  })
}

function get (target, key) {
  track(target, key)
  return Reflect.get(target, key)
}

function set (target, key, value) {
  const ret = Reflect.set(target, key, value)
  trigger(target, key)
  return ret
}

export function track (target, key) {
  if (!activeEffect.value) return

  let depsMap = bucket.get(target)
  depsMap || (bucket.set(target, (depsMap = new Map())))
  let deps = depsMap.get(key)
  deps || (depsMap.set(key, (deps = new Set())))
  deps.add(activeEffect.value) // 收集依赖到依赖集合中
  activeEffect.value.deps.push(deps) // 建立副作用函数和依赖集合的联系
}

export function trigger (target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  const effectsToRun = new Set() // 拷贝一份，避免cleanup时造成死循环
  effects && effects.forEach(effect => {
    if (effect !== activeEffect) { // 当activeEffect和effect相同时说明此时正在执行副作用函数，此时无需再次添加到effectsToRun中执行
      effectsToRun.add(effect)
    }
  })
  effectsToRun.forEach(effect => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}
