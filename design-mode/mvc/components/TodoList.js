import TodoItem from './TodoItem.js'

export default function TodoList (todoList) {
  const oUl = document.createElement('ul')
  todoList.forEach(todo => {
    const oLi = TodoItem(todo)
    oUl.appendChild(oLi)
  })
  oUl.className = 'todo-body'
  return oUl
}