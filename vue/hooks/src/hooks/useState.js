import { ref } from 'vue'

export function useState (initialValue) {
  const _state = createState(initialValue)
  const _stateSetter = createStateSetter(_state)

  return[_state, _stateSetter]
}

function createState (initialValue) {
  return ref(initialValue)
}

function createStateSetter (state) {
  return function (payload) {
    if (typeof payload === 'function') {
      state.value = payload(state.value)
    } else {
      state.value = payload
    }
  }
}
