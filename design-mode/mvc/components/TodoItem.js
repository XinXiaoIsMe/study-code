export default function TodoItem (todo) {
  const oLi = document.createElement('li')
  oLi.innerHTML = `
    <input
      class="todo-checkbox"
      type="checkbox"
      ${ todo.completed ? 'checked' : '' }
    />
    <span class="${ todo.completed ? 'completed' : '' }">${ todo.content }</span>
    <button class="todo-delete-btn">DELETE</button>
  `
  oLi.className = 'todo-list-item'
  oLi.dataset.id = todo.id
  return oLi
}