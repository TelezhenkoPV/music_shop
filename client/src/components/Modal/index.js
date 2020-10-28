import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../../store/modal/modalAction'
import useStyles from './styles'

export default function TransitionsModal() {
  const open = useSelector((state) => state.modalStatus)
  const dispatch = useDispatch()
  const classes = useStyles()

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
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.message}>
              <p>To create Registration Form :)</p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
