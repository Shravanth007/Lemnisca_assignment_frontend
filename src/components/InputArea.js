import React from 'react';
import { UI_TEXT } from '../config';

const InputArea = ({
  input,
  loading,
  showNewConversation,
  onInputChange,
  onKeyPress,
  onSend,
  onNewConversation
}) => {
  return (
    <div className="input-container">
      {showNewConversation && (
        <button
          className="new-conversation-btn"
          onClick={onNewConversation}
          data-tooltip={UI_TEXT.NEW_CONVERSATION_TOOLTIP}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyPress}
        placeholder={UI_TEXT.INPUT_PLACEHOLDER}
        disabled={loading}
      />
      <button
        onClick={onSend}
        disabled={loading || !input.trim()}
        className="send-btn"
      >
        {loading ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="send-spinner">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeDasharray="50" strokeDashoffset="15">
              <animateTransform attributeName="transform" type="rotate"
                values="0 12 12;360 12 12" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default InputArea;
