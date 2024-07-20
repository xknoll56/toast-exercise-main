import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { onMessage } from './service/mockServer';
import { useEffect } from 'react';

export default function Toast() {

  const init = () => {
    onMessage(onFormSubmission);
  };

  useEffect(() => {
    init();
  }, []); 

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onFormSubmission = (message) => {
    console.log(message);
    if(!open)
        setOpen(true);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}