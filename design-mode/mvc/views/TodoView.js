import TodoForm from '../components/TodoForm.js'
import TodoList from '../components/TodoList.js'

export default function TodoView (data) {
  const oTodoContainer = document.createElement('div')
  const oTodoForm = TodoForm()
  const oTodoBody = TodoList(data)

  oTodoContainer.className = 'todo-list'
  oTodoContainer.appendChild(oTodoForm)
  oTodoContainer.appendChild(oTodoBody)

  return oTodoContainer
}
