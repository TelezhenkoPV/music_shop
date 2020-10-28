import { MODAL_TOGGLE } from '../actionTypes'

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case MODAL_TOGGLE:
      return !state
    default:
      return state
  }
}

export default modalReducer
