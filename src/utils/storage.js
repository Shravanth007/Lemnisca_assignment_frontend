import { STORAGE_KEYS } from '../config';

export const getSavedMessages = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return saved ? JSON.parse(saved) : [];
};

export const saveMessages = (messages) => {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const getSavedSessionId = () => {
  return localStorage.getItem(STORAGE_KEYS.SESSION_ID) || `session-${Date.now()}`;
};

export const saveSessionId = (sessionId) => {
  localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
};

export const clearMessages = () => {
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
};

export const generateSessionId = () => {
  return `session-${Date.now()}`;
};
