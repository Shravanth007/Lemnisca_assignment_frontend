import React from 'react';
import { UI_TEXT, SUGGESTIONS } from '../config';

const WelcomeSection = ({ onSuggestionClick }) => {
  return (
    <div className="welcome-section">
      <h1>{UI_TEXT.TITLE}</h1>
      <p className="subtitle">{UI_TEXT.SUBTITLE}</p>
      
      <div className="suggestions">
        <p className="suggestions-label">{UI_TEXT.SUGGESTIONS_LABEL}</p>
        <div className="suggestion-chips">
          {SUGGESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              className="suggestion-chip"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
