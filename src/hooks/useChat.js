import { useState, useEffect, useRef } from 'react';
import {
  getSavedMessages,
  saveMessages,
  clearMessages,
} from '../utils/storage';
import { sendChatMessage, resetConversation } from '../services/apiService';

export const useChat = () => {
  const [messages, setMessages] = useState(getSavedMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [latestMetadata, setLatestMetadata] = useState(null);
  const [latestSources, setLatestSources] = useState([]);
  const messagesEndRef = useRef(null);

  // Persist messages to localStorage
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    setInput('');

    // Add user message
    const userMsg = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: messageText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await sendChatMessage(messageText, conversationId);

      // Save the conversation_id from first response
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      // Build assistant message with metadata + sources attached
      const assistantMsg = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.answer,
        metadata: data.metadata || null,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setLatestMetadata(data.metadata || null);
      setLatestSources(data.sources || []);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Something went wrong. Please make sure the backend is running and try again.',
      };
      setMessages((prev) => [...prev, errorMsg]);
      setLatestMetadata(null);
      setLatestSources([]);
    }

    setLoading(false);
  };

  const startNewConversation = async () => {
    if (messages.length === 0) return;

    try {
      await resetConversation(conversationId);
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }

    setConversationId(null);
    setMessages([]);
    setInput('');
    setLatestMetadata(null);
    setLatestSources([]);
    clearMessages();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    input,
    loading,
    conversationId,
    latestMetadata,
    latestSources,
    messagesEndRef,
    setInput,
    sendMessage,
    startNewConversation,
    handleKeyPress,
  };
};
