import store from '../redux'
import { actionTypes } from '../redux/crypt'

export const setMessage = (message, key, cryptMessage) => {
  store.dispatch({ type: actionTypes.SET, payload: {message, key, cryptMessage} })
}