import store from '../redux'

export function setMessage(message, key, cryptMessage) {

  store.dispatch({ 
    type: 'SET_MESSAGE', 
    payload: {
      message,
      key,
      cryptMessage,
    } })
}