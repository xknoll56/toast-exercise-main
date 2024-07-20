import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';
import { List, ListItem, ListItemText } from '@mui/material';

export default function Content() {
  const [likedMessages, setLikedMessages] = useState([]);

  const handleLikedMessagesUpdate = (messages) => {
    setLikedMessages(messages);
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <List>
        {likedMessages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${message.data.firstName || ''} ${message.data.lastName || ''}`}
              secondary={message.data.email || ''}
            />
          </ListItem>
        ))}
      </List>
      <Toast onLikedMessagesUpdate={handleLikedMessagesUpdate} />
    </Box>
  );
}
