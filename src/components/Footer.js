import React from 'react';
import { UI_TEXT } from '../config';

const Footer = () => {
  return (
    <div className="footer-message">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="info-icon">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span>{UI_TEXT.FOOTER_MESSAGE}</span>
    </div>
  );
};

export default Footer;
