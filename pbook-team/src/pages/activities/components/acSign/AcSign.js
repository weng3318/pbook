import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import './acSign.scss'

function AcSign(props) {
  return (
    <>
      <div className="acSing">
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">活動報名</DialogTitle>
          <DialogContent>
            <DialogContentText>報名此活動</DialogContentText>
            <TextField
              margin="normal"
              id="name"
              label="姓名"
              type="name"
              fullWidth
            />
            <TextField
              margin="normal"
              id="phone"
              label="手機"
              type="text"
              fullWidth
            />
            <TextField
              margin="normal"
              id="email"
              label="電子郵件"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
export default AcSign
