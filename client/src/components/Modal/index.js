import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal, closeModal } from '../../store/modal/modalAction'
import useStyles from './styles'

import Login from '../Login'

export default function TransitionsModal() {
  const open = useSelector((store) => store.modalStatus.isOpen)
  const modalData = useSelector((store) => store.modalStatus)

  let component
  switch (modalData.content) {
    case 'login':
      component = <Login />
      break
    default:
      component = null
  }

  const dispatch = useDispatch()
  const classes = useStyles()

  if (open && !component) dispatch(closeModal())

  const handleClose = () => {
    dispatch(toggleModal())
  }

  return (
    <div>
      <Modal
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{component}</div>
        </Fade>
      </Modal>
    </div>
  )
}
