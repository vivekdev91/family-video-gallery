import React, { useState, useEffect } from 'react';
import './VideoCard.css';

const VideoCard = ({ videoData, index, thumbnailUrl, fallbackTitle, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const formattedIndex = (index + 1).toString().padStart(2, '0');
  const defaultTitle = fallbackTitle || `Family Memory ${formattedIndex}`;
  const [videoTitle, setVideoTitle] = useState(defaultTitle);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        // Use noembed.com — a CORS-friendly oEmbed proxy that returns real YouTube metadata
        const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoData.id)}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.title) {
            setVideoTitle(data.title);
            return; // YouTube title found, done
          }
        }
      } catch (err) {
        // Silently fall back
      }
      // If YouTube title was not available, keep the fallback (JSON title or "Family Memory XX")
    };
    
    if (videoData && videoData.id) {
      fetchTitle();
    }
  }, [videoData.id, defaultTitle]);

  return (
    <div className="video-card unselectable" onClick={() => onClick(videoData)}>
      <div className="video-card-inner">
        <div className="thumbnail-wrapper">
          {!imgError ? (
            <img 
              src={thumbnailUrl} 
              alt={`Family Memory ${formattedIndex}`} 
              className="thumbnail-img"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="thumbnail-fallback private-fallback">
              <svg className="fallback-lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="fallback-play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
              </div>
              <span className="fallback-title">Private Family Video</span>
              <span className="fallback-subtitle">Open Video</span>
            </div>
          )}
          
          <div className="watermark-overlay">
            <span>PRIVATE FAMILY ARCHIVE</span>
          </div>

          <div className="play-button-overlay">
            <div className="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{videoTitle}</h3>
          <div className="card-meta">
            <svg className="lock-icon-small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
