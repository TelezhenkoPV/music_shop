import { MODAL_TOGGLE, MODAL_CLOSE, MODAL_OPEN } from './modalConstants'

export const toggleModal = (content) => ({
  type: MODAL_TOGGLE,
  payload: content,
})

export const closeModal = () => ({
  type: MODAL_CLOSE,
})

export const openModal = (content) => ({
  type: MODAL_OPEN,
  payload: content,
})
