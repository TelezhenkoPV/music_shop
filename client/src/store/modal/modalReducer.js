import { MODAL_TOGGLE, MODAL_CLOSE, MODAL_OPEN } from '../actionTypes'

const initialState = {
  isOpen: false,
  content: null,
}

const modalReducer = (store = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return { isOpen: true, content: action.payload }
    case MODAL_TOGGLE:
      return { isOpen: !store.isOpen, content: action.payload }
    case MODAL_CLOSE:
      return { ...initialState }
    default:
      return store
  }
}

export default modalReducer
