import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VITE_GEMINI_API_KEY } from '../config';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [initialGreetingShown, setInitialGreetingShown] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-lite',
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });

  useEffect(() => {
    if (!initialGreetingShown && messages.length === 0) {
      setMessages([{ role: 'assistant', content: 'Hello! How can I assist you today?' }]);
      setInitialGreetingShown(true);
    }
  }, [initialGreetingShown, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
      });

      const conversationHistory = updatedMessages
        .map(msg => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
        .join('\n');

      const prompt = `You are a helpful AI assistant. Continue the conversation naturally.\n\n${conversationHistory}\nAI:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      maxWidth: '900px',
      margin: '0 auto',
      padding: 2,
    }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
        Gemini AI Chat
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          mb: 2,
          p: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem 
              key={index} 
              sx={{
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                mb: 1,
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                  ml: message.role === 'user' ? 2 : 0,
                  mr: message.role === 'assistant' ? 2 : 0,
                }}
              >
                {message.role === 'user' ? 'U' : 'AI'}
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '70%',
                  backgroundColor: message.role === 'user' ? '#e3f2fd' : '#f5f5f5',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </Typography>
              </Paper>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem>
              <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>AI</Avatar>
              <Typography>Thinking...</Typography>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          multiline
          maxRows={4}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          sx={{ height: '56px' }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
