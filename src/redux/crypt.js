const initState = {
  message: '',
  key: '',
  cryptMessage: '',
}

export const actionTypes = {
  SET: 'SET',
}

export default function(state = initState, action){
  switch(action.type){
    case actionTypes.SET:
      return {
        ...state,
        message: action.payload.message,
        key: action.payload.key,
        cryptMessage: action.payload.cryptMessage,
      }
    default:
      return state
  }
}