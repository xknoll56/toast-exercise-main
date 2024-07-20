import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { onMessage } from './service/mockServer';
import { useEffect, useState } from 'react';
import { saveLikedFormSubmission, fetchLikedFormSubmissions } from './service/mockServer';

export default function Toast({ onLikedMessagesUpdate }) {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [likedMessages, setLikedMessages] = useState([]);

    const init = async () => {
      onMessage(onFormSubmission);
      await updateLikedSubmissions();
    };

  useEffect(() => {
    init();
  }, []); 

  useEffect(() => {
    if (messages.length > 0 && messages[0]) {
      setOpen(true);
    }
  }, [messages]);

  useEffect(() => {
    onLikedMessagesUpdate(likedMessages); // Notify parent of liked messages update
  }, [likedMessages, onLikedMessagesUpdate]);



  const handleDismiss = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const messagesLength = messages.length;
    setMessages(prevMessages => prevMessages.slice(1));
    if(messagesLength === 1)
        setOpen(false);
  };

  const insertLikedSubmission = async (formSubmission, delay = 0) => {
    const trySave = async () => {
      try {
        await saveLikedFormSubmission(formSubmission);
      } catch (error) {
        console.error("Error saving message. Retrying in", delay, "ms...", error.message);
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
        await trySave(); // Retry the operation
      }
    };
  
    await trySave();
  };

  const updateLikedSubmissions = async (delay = 0) => {
    const tryUpdate = async () => {
      try {
        const submissions = await fetchLikedFormSubmissions();
        setLikedMessages(submissions.formSubmissions);
      } catch (error) {
        console.error("Error saving message. Retrying in", delay, "ms...", error.message);
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
        await tryUpdate(); // Retry the operation
      }
    };
  
    await tryUpdate();
  };

  const handleLike = async () => {
    if (messages.length > 0) {
      const firstMessage = messages[0]; // Get the first message
      setMessages(prevMessages => prevMessages.slice(1)); // Remove the first message
      setLikedMessages(prevLikedMessages => [...prevLikedMessages, firstMessage]);
      // Save the liked submission
      try {
        await insertLikedSubmission(firstMessage);
      } catch (error) {
        console.error("Error inserting liked submission:", error);
      }
    }
  };

  const onFormSubmission = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const messageStyle = {
    whiteSpace: 'pre-line', // Preserves whitespace and line breaks
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
        message={
            <div style={messageStyle}>
              {`${messages[0]?.data.firstName || ''} ${messages[0]?.data.lastName || ''}\n${messages[0]?.data.email || ''}`}
            </div>
          }
        action={action}
      />}
    </div>
  );
}