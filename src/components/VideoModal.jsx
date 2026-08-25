import React, { useEffect, useRef } from 'react';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import './VideoModal.css';

const VideoModal = ({ videoData, onClose }) => {
  const modalRef = useRef(null);

  // Close on ESC and manage focus/scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    // Auto-focus modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Close when clicking on the backdrop
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  if (!videoData || !videoData.id) return null;

  const isShort = videoData.isShort;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Video Player"
      tabIndex="-1"
      ref={modalRef}
    >
      <div className={`modal-content ${isShort ? 'shorts-modal' : ''}`}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close video"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={`video-container ${isShort ? 'shorts-container' : ''}`}>
          {/* Iframe is only rendered when modal is open */}
          <iframe
            src={getYouTubeEmbedUrl(videoData.id)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-iframe"
          ></iframe>
        </div>
        
        <div className="modal-footer">
          <p className="privacy-note">
            Protected by YouTube Permissions. <br className="mobile-break" />
            Only authorized accounts can view this video.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
