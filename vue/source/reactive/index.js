// const obj = {
//   msg: 'Hello, world!',
//   ok: true
// }
// const effectStack = []
// const bucket = new WeakMap()
// let activeEffect

// const $obj = new Proxy(obj, {
//   get (target, key) {
//     track(target, key)
//     return Reflect.get(target, key)
//   },
//   set (target, key, value) {
//     const ret = Reflect.set(target, key, value)
//     trigger(target, key)
//     return ret
//   }
// })

// function track (target, key) {
//   if (!activeEffect) return

//   let depsMap = bucket.get(target)
//   depsMap || (bucket.set(target, (depsMap = new Map())))
//   let deps = depsMap.get(key)
//   deps || (depsMap.set(key, (deps = new Set())))
//   deps.add(activeEffect) // 收集依赖到依赖集合中
//   activeEffect.deps.push(deps) // 建立副作用函数和依赖集合的联系
// }

// function trigger (target, key) {
//   const depsMap = bucket.get(target)
//   if (!depsMap) return

//   const effects = depsMap.get(key)
//   const effectsToRun = new Set() // 拷贝一份，避免cleanup时造成死循环
//   effects && effects.forEach(effect => {
//     if (effect !== activeEffect) { // 当activeEffect和effect相同时说明此时正在执行副作用函数，此时无需再次添加到effectsToRun中执行
//       effectsToRun.add(effect)
//     }
//   })
//   effectsToRun.forEach(effect => {
//     if (effect.options.scheduler) {
//       effect.options.scheduler(effect)
//     } else {
//       effect()
//     }
//   })
// }

// function effect (fn, options = {}) {
//   const effectFn = function () {
//     cleanup(effectFn) // 每次执行副作用函数的时候清除相应依赖
//     activeEffect = effectFn
//     effectStack.push(effectFn) // 使用栈防止effect嵌套时内层的effect执行后覆盖了activeEffect
//     fn()
//     effectStack.pop()
//     activeEffect = effectStack.at(-1) // 还原为外层的副作用函数
//   }
//   effectFn.deps = [] // 用于保存和effectFn相关的依赖集合
//   effectFn.options = options // 保存options用于调度
//   effectFn()
// }

// function cleanup (effectFn) {
//   const deps = effectFn.deps
//   deps.forEach(depSet => depSet.delete(effectFn)) // 将当前依赖从依赖集合中删除
//   deps.length = 0 // 重置
// }

// // let count = 0
// // let doing = false

// // effect(function () {
// //   document.body.textContent = $obj.msg
// // }, {
// //   scheduler (fn) {
// //     fn()
// //     count ++
// //     if (doing) return
// //     doing = true
// //     Promise.resolve().then(() => console.log(`您一共修改了${ count }次`))
// //   }
// // })

// // $obj.msg = 'Hello, Vue!'
// // $obj.msg = 'Hello, JavaScript!'
// // $obj.msg = 'Hello, TypeScript!'

// // 输出结果：您一共修改了3次

// function computed (fn) {
//   return new Proxy({ value: undefined }, {
//     get (target, key) {
//       return fn()
//     }
//   })
// }

// import { createProxy, effect } from './reactive-system/index.js'

// const $obj = createProxy({
//   msg: 'Hello, world!'
// })
// let count = 0
// let doing = false

// effect(function () {
//   document.body.textContent = $obj.msg
// }, {
//   scheduler (fn) {
//     fn()
//     count ++
//     if (doing) return
//     doing = true
//     Promise.resolve().then(() => console.log(`您一共修改了${ count }次`))
//   }
// })

// $obj.msg = 'Hello, Vue!'
// $obj.msg = 'Hello, JavaScript!'
// $obj.msg = 'Hello, TypeScript!'

/**
 * computed test
 */
// import {
//   createProxy,
//   effect,
//   computed
// } from './reactive-system/index.js'

// const state = createProxy({
//   a: 1,
//   b: 2
// })
// const sum = computed(() => state.a + state.b)
// effect(() => {
//   console.log('sum', sum.value)
// })

// state.a = 3

/**
 * watch test
 */
import {
  createProxy,
  watch
} from './reactive-system/index.js'

const state = createProxy({
  a: 1
})

watch(state, () => {
  console.log('changed')
}, { immediate: true })

state.a ++
