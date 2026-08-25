import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoGallery from './components/VideoGallery';
import VideoModal from './components/VideoModal';
import PrivacyOverlay from './components/PrivacyOverlay';
import Notification from './components/Notification';
import { initSecurityDeterrents } from './utils/security';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [activeVideo, setActiveVideo] = useState(null);
  const [securityMessage, setSecurityMessage] = useState('');

  // Fetch videos on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/videos.json');
        if (!response.ok) {
          throw new Error('Failed to fetch videos.json');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          throw new Error('videos.json must be an array of URLs');
        }
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Initialize security deterrents
  useEffect(() => {
    const cleanup = initSecurityDeterrents((message) => {
      setSecurityMessage(message);
    });
    return cleanup;
  }, []);

  const handleVideoClick = (videoData) => {
    setActiveVideo(videoData);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
  };

  const closeNotification = () => {
    setSecurityMessage('');
  };

  return (
    <div className="app-container">
      <PrivacyOverlay />
      <Notification message={securityMessage} onClose={closeNotification} />
      
      <Header />
      
      <main className="main-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading Family Memories...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <h2>Unable to load the family gallery.</h2>
            <p>Please ensure videos.json is correctly configured.</p>
          </div>
        ) : (
          <VideoGallery videos={videos} onVideoClick={handleVideoClick} />
        )}
      </main>

      {activeVideo && (
        <VideoModal videoData={activeVideo} onClose={closeVideoModal} />
      )}
    </div>
  );
}

export default App;
