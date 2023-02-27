import {
  httpGet,
  httpPost
} from '../http.js'

async function getList () {
  return await httpGet('/get_list')
}

async function addTodo (todo) {
  return httpPost('/add_todo', todo)
}

async function removeTodo (id) {
  return httpPost('/remove_todo', { id })
}

async function toggleTodo (id) {
  return httpPost('/change_todo', { id })
}

export default {
  getList,
  addTodo,
  removeTodo,
  toggleTodo
}
