import TodoModel from '../models/TodoModel.js'
import TodoView from '../views/TodoView.js'
import TodoItem from '../components/TodoItem.js'

export default async function todoController (oContainer) {
  const init = async () => {
    await render()
    bindEvent()
  }

  async function render () {
    const { data } = await TodoModel.getList()

    const todoListView = TodoView(data)
    oContainer.appendChild(todoListView)
  }

  function bindEvent () {
    const oTodoInput = oContainer.querySelector('.todo-input')
    const oAddTodoBtn = oContainer.querySelector('.todo-add-btn')
    const oTodoBody = oContainer.querySelector('.todo-body')

    oAddTodoBtn.addEventListener('click', handleAddBtnClick.bind(oAddTodoBtn, oTodoInput, oTodoBody))
    oTodoBody.addEventListener('click', handleTodoBodyClick)
  }

  function handleAddBtnClick (oTodoInput, oTodoBody) {
    const value = oTodoInput.value.trim()
    if (!value) return

    const todo = {
      id: new Date().getTime().toString(),
      content: value,
      completed: false
    }

    oTodoInput.value = ''
    TodoModel.addTodo(todo).then(() => {
      oTodoBody.appendChild(TodoItem(todo))
    })
  }

  function handleTodoBodyClick (event) {
    const tar = event.target
    const className = tar.className
    const parentNode = tar.parentNode

    switch (className) {
      case 'todo-checkbox':
        toggleTodo(parentNode)
        break
      case 'todo-delete-btn':
        removeTodo(parentNode)
        break
      default:
        break
    }
  }

  function removeTodo (node) {
    const id = node.dataset.id
    TodoModel.removeTodo(id).then(() => {
      node.remove()
    })
  }

  function toggleTodo (node) {
    const id = node.dataset.id
    const oTodoText = node.querySelector('span')
    TodoModel.toggleTodo(id).then(() => {
      oTodoText.classList.toggle('completed')
    })
  }

  init()
}
