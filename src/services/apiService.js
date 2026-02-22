import { API_BASE_URL } from '../config';

/**
 * Send a chat message to the ClearPath backend.
 * POST /query  →  { question, conversation_id }
 *
 * Returns the full QueryResponse object from the API.
 */
export const sendChatMessage = async (message, conversationId) => {
  const body = {
    question: message,
  };

  // Only include conversation_id if we already have one
  if (conversationId) {
    body.conversation_id = conversationId;
  }

  const res = await fetch(`${API_BASE_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Backend error (${res.status}): ${errorText}`);
  }

  return res.json();
};

/**
 * Reset the conversation.  The backend uses in-memory
 * conversation stores, so we just clear local state.
 */
export const resetConversation = async (_sessionId) => {
  return true;
};
