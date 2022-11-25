<template>
<form class="form">
  <label for="name">Name:</label>
  <input type="text" id="name" v-model="formData.name">
  <br />
  <label for="age">Age:</label>
  <input type="text" id="age" v-model="formData.age">
  <br />
  <label for="hobby">Hobby:</label>
  <input type="text" id="hobby" v-model="formData.hobby">
  <br />
  <button @click.prevent="reset">RESET</button>
</form>
</template>

<script setup>
// import { reactive } from 'vue'
import { useReactive } from '../../hooks'

const data = {
  name: 'zhangsan',
  age: 17,
  hobby: 'basketball'
}

const initialData = JSON.parse(JSON.stringify(data))

// 方法一：修改不方便，如果直接对formData赋值或者解构会丢失响应式
// const formData = reactive(data)

// function reset () {
//   for (const key in initialData) {
//     if (formData.hasOwnProperty(key)) {
//       formData[key] = initialData[key]
//     }
//   }
// }

// 方法二：使用函数进行修改，语义化更明确，修改更方便。变量声明和修改方法都通过一个函数调用返回，集成性更好。
// 通过返回refs可以方便解构
const [formData, formDataRefs, setFormData] = useReactive(data)

setTimeout(() => {
  const { age } = formDataRefs // 不会丢失响应式
  age.value = 18
}, 1000)

function reset () {
  setFormData(initialData)
}
</script>

<style scoped>
.form {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #000;
}

label {
  display: inline-block;
  width: 80px;
}
</style>
