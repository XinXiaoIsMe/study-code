import { reactive, toRefs } from 'vue'

export function useReactive (initialState) {
  const state = reactive(initialState)
  const stateRefs = toRefs(state)

  const setState = (payloadOrKey, value) => {
    if (({}).toString(payloadOrKey) === '[object Object]') {
      for (const key in payloadOrKey) {
        if (state.hasOwnProperty(key)) {
          state[key] = payloadOrKey[key]
        }
      }
    } else {
      state[payloadOrKey] = value
    }
  }

  return [
    state,
    stateRefs,
    setState
  ]
}
