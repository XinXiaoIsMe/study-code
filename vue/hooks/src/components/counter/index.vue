<template>
<div class="counter">
  <!-- 方式1（不推荐，集成性不好）
  <button @click="plus(1)">+</button>
  <span>{{ count }}</span>
  <button @click="minus(1)">-</button> -->
  <!-- 方式2（集成性更好，更易维护，但是方法没有集成）
  <button @click="plus(1)">+</button>
  <span>{{ count }}</span>
  <button @click="minus(1)">-</button> -->
  <button @click="countDispatch({
    type: 'PLUS',
    payload: 1
  })">+</button>
  <span>{{ count }}</span>
  <button @click="countDispatch({
    type: 'MINUS',
    payload: 1
  })">-</button>
</div>
</template>

<script setup>
// import { ref } from 'vue'
import { 
  // useState, 
  useReducer
} from '../../hooks'

// 版本一：集成性不好、赋值语句的使用导致语义不够明确，当赋值语句过多时会难以维护
// const count = ref(0)

// function plus (value) {
//   count.value += value
// }

// function minus (value) {
//   count.value -= value
// }

// 版本二：将变量声明和修改操作集成到一个函数调用，方便维护。但是操作方法没有集成
// const [count, setCount] = useState(0)

// function plus (value) {
//   setCount(_count => _count + value)
// }

// function minus (value) {
//   setCount(_count => _count - value)
// }

// 版本三：将变量声明、修改以及更加复杂的操作都集成到一个函数调用。更易维护，扩展性更高
// 在React中，useReducer是对useState的一个优化，和useState相比，它提供了reducer
// 函数使得可以接受更加复杂的操作
const [count, countDispatch] = useReducer(0, (count, setCount, { type, payload }) => {
  switch (type) {
    case 'PLUS':
      setCount(state => state + payload)
      break
    case 'MINUS':
      setCount(count.value - payload)
      break
    default:
      break
  }
})
</script>

<style scoped>

</style>
