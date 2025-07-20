//Material UI
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})


function Modal({ textButton, title, value, total, color, disabled, handleAcept }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment >
      <Button disabled={disabled} color={color} size='large' variant="contained" onClick={handleClickOpen} sx={{ display: 'block', mx: 'auto', my: 3 }}>
        {textButton}
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>Você poderá resgatar{value} de {total} agora</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='error'>Recusar</Button>
          <Button onClick={handleAcept} variant='contained' color='success'>Aceitar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Modal