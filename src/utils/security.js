/**
 * Initializes casual copy deterrents.
 * Note: These are NOT true security mechanisms and only deter casual copying.
 * 
 * @param {Function} onIntercept - Callback when a blocked action is attempted
 * @returns {Function} Cleanup function to remove event listeners
 */
export const initSecurityDeterrents = (onIntercept) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    onIntercept("Right-click is disabled for privacy.");
  };

  const handleDragStart = (e) => {
    // Only prevent dragging images/links to allow normal text selection where needed,
    // though we might also have CSS user-select: none on the gallery.
    if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
      e.preventDefault();
      onIntercept("Dragging is disabled.");
    }
  };

  const handleKeyDown = (e) => {
    // Prevent Ctrl+S, Ctrl+U, Ctrl+C, Ctrl+Shift+I, F12
    const isCtrl = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();

    if (
      (isCtrl && (key === 's' || key === 'u' || key === 'c')) ||
      (isCtrl && e.shiftKey && key === 'i') ||
      (e.key === 'F12')
    ) {
      e.preventDefault();
      onIntercept("This shortcut is disabled for privacy.");
    }
  };

  // Attach event listeners to document
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('dragstart', handleDragStart);
    document.removeEventListener('keydown', handleKeyDown);
  };
};
