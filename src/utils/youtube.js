/**
 * Safely extracts the YouTube Video ID and type from various YouTube URL formats.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID?feature=share
 * 
 * @param {string} url - The YouTube URL
 * @returns {{ id: string, isShort: boolean }|null} The video data, or null if invalid
 */
export const getYouTubeData = (url) => {
  if (!url || typeof url !== 'string') return null;

  try {
    const parsedUrl = new URL(url);
    
    // Handle youtu.be/VIDEO_ID
    if (parsedUrl.hostname === 'youtu.be') {
      return { id: parsedUrl.pathname.slice(1), isShort: false };
    }
    
    // Handle youtube.com
    if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname.startsWith('/embed/')) {
        return { id: parsedUrl.pathname.split('/')[2], isShort: false };
      }
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        return { id: parsedUrl.pathname.split('/')[2], isShort: true };
      }
      if (parsedUrl.pathname === '/watch') {
        return { id: parsedUrl.searchParams.get('v'), isShort: false };
      }
    }
  } catch (error) {
    console.error("Invalid URL format:", url);
  }

  return null;
};

/**
 * Returns the standard YouTube thumbnail URL for a given video ID.
 * @param {string} videoId 
 * @returns {string}
 */
export const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Returns the embed URL for a given video ID.
 * @param {string} videoId 
 * @returns {string}
 */
export const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};
