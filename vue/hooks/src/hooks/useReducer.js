import { useState } from './useState'

export function useReducer (initialValue, reducer) {
  const [state, setState] = useState(initialValue)
  
  const dispatch = (action) => {
    reducer(state, setState, action)
  }

  return [state, dispatch]
}
