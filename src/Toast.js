import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { onMessage } from './service/mockServer';
import { useEffect, useState } from 'react';

export default function Toast() {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [likedMessages, setLikedMessages] = useState([]);

    const init = () => {
      onMessage(onFormSubmission);
    };

  useEffect(() => {
    init();
  }, []); 

  useEffect(() => {
    if (messages.length > 0 && messages[0]) {
      setOpen(true);
    }
  }, [messages]);



  const handleDismiss = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const messagesLength = messages.length;
    setMessages(prevMessages => prevMessages.slice(1));
    console.log(messagesLength)
    if(messagesLength === 1)
        setOpen(false);
  };

  const handleLike = () => {
    let firstMessage = messages.shift();
    setLikedMessages(prevLikedMessages => [...prevLikedMessages, firstMessage]);
  }
  const onFormSubmission = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleLike}>
        LIKE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleDismiss}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {messages.length>0 &&<Snackbar
        open={open}
        onClose={handleDismiss}
        message={messages[0].id}
        action={action}
      />}
    </div>
  );
}