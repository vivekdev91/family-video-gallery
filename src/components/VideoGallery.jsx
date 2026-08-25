import React from 'react';
import VideoCard from './VideoCard';
import { getYouTubeData, getYouTubeThumbnail } from '../utils/youtube';
import './VideoGallery.css';

const VideoGallery = ({ videos, onVideoClick }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="gallery-empty">
        <p>No memories found. Add some YouTube links to videos.json.</p>
      </div>
    );
  }

  return (
    <div className="video-gallery">
      {videos.map((entry, index) => {
        // Normalize: support both plain string URLs and { url, title } objects
        const videoUrl = typeof entry === 'string' ? entry : entry.url;
        const fallbackTitle = typeof entry === 'object' && entry.title ? entry.title : null;
        const videoData = getYouTubeData(videoUrl);
        
        // If URL is invalid, render a placeholder card
        if (!videoData) {
          return (
            <div key={`invalid-${index}`} className="video-card invalid-card">
              <div className="video-card-inner">
                <div className="thumbnail-wrapper">
                  <div className="thumbnail-fallback">
                    <span className="fallback-text">Invalid URL</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{fallbackTitle || `Memory ${String(index + 1).padStart(2, '0')}`}</h3>
                  <p className="card-error-text">Video unavailable</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <VideoCard 
            key={videoData.id} 
            videoData={videoData} 
            index={index} 
            thumbnailUrl={getYouTubeThumbnail(videoData.id)}
            fallbackTitle={fallbackTitle}
            onClick={onVideoClick}
          />
        );
      })}
    </div>
  );
};

export default VideoGallery;
