export const bucket = new WeakMap() // 用于存储依赖的桶
export const effectStack = [] // 存储副作用函数的栈
export const activeEffect = { value: undefined } // value中保存当前的副作用函数，这里需要导出一个对象，不能直接导出一个值，因为在ES Module中无法修改导入的值
