import React, { useEffect, useState } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, show, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(show);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setIsExiting(false);
      
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, 300); // Match the CSS transition duration
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${isExiting ? 'notification-exit' : ''}`}>
      <div className="notification-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="notification-content">
        <p className="notification-title">Backend Cold Start</p>
        <p className="notification-message">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
