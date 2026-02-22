import React from 'react';
import ReactMarkdown from 'react-markdown';
import { UI_TEXT } from '../config';

const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const cleanUrl = url.replace(/[.,;:!?)]$/, '');
    const punctuation = url.slice(cleanUrl.length);
    return `[${cleanUrl}](${cleanUrl})${punctuation}`;
  });
};

const EvaluatorWarning = ({ flags }) => {
  if (!flags || flags.length === 0) return null;

  const flagLabels = {
    no_context: 'No relevant documents found — answer may be unreliable.',
    refusal: 'The assistant could not find an answer in the documentation.',
    internal_data_leak: 'Response may contain internal data not meant for customers.',
  };

  return (
    <div className="evaluator-warning">
      <div className="evaluator-warning-icon">⚠️</div>
      <div className="evaluator-warning-text">
        {flags.map((flag, i) => (
          <span key={i}>
            {flagLabels[flag] || `Flag: ${flag}`}
            {i < flags.length - 1 ? ' ' : ''}
          </span>
        ))}
        <span className="evaluator-verify"> — please verify with support.</span>
      </div>
    </div>
  );
};

const SourceChips = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="source-chips">
      {sources.map((src, i) => (
        <span key={i} className="source-chip" title={`Page ${src.page} · Score ${(src.relevance_score * 100).toFixed(0)}%`}>
          📄 {src.document.replace('.pdf', '')}
        </span>
      ))}
    </div>
  );
};

const MessageList = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="messages">
      {messages.map((msg, idx) => (
        <div key={msg.id || idx} className={`message-wrapper ${msg.role}`}>
          <div className="message-label">
            {msg.role === 'user' ? UI_TEXT.USER_LABEL : UI_TEXT.ASSISTANT_LABEL}
          </div>
          <div className="message-content">
            <ReactMarkdown>
              {msg.role === 'assistant' ? linkify(msg.content) : msg.content}
            </ReactMarkdown>
          </div>

          {/* Evaluator flag warning banner */}
          {msg.role === 'assistant' && msg.metadata?.evaluator_flags?.length > 0 && (
            <EvaluatorWarning flags={msg.metadata.evaluator_flags} />
          )}

          {/* Source document chips */}
          {msg.role === 'assistant' && msg.sources?.length > 0 && (
            <SourceChips sources={msg.sources} />
          )}
        </div>
      ))}

      {loading && (
        <div className="message-wrapper assistant">
          <div className="message-label">{UI_TEXT.ASSISTANT_LABEL}</div>
          <div className="message-content loading-dots">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
