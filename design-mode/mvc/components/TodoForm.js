export default function TodoForm () {
  const oTodoForm = document.createElement('div')
  oTodoForm.innerHTML = `
    <input type="text" class="todo-input" />
    <button class="todo-add-btn">ADD</button>
  `
  oTodoForm.className = 'todo-form'
  return oTodoForm
}