import React from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'
import { closeModal } from '../../store/modal/modalAction'

export default function TransitionsModal() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { isOpen, component } = useSelector((store) => store.modalStatus)

  if (isOpen && !component) dispatch(closeModal())

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <div>
      <Modal
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>{component}</div>
        </Fade>
      </Modal>
    </div>
  )
}
