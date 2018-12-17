import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initState = {
  message: '',
}

function reducer(state =  initState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        message: action.payload.message,
        key: action.payload.key,
        cryptMessage: action.payload.cryptMessage,
      }
    default: 
      return state
  }
}

export default createStore(reducer, composeWithDevTools())