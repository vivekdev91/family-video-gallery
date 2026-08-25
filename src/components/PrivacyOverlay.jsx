import React, { useEffect, useState } from 'react';
import './PrivacyOverlay.css';

const PrivacyOverlay = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!isHidden) return null;

  return (
    <div className="privacy-overlay">
      <div className="privacy-content">
        <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="privacy-title">Privacy Mode</h2>
        <p className="privacy-text">Content hidden while you are away.</p>
      </div>
    </div>
  );
};

export default PrivacyOverlay;
