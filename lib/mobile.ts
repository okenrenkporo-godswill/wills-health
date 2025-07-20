/**
 * Utility to check if the current window width is considered mobile.
 * The default breakpoint is 768px but can be customized.
 *
 * @param {number} breakpoint - The pixel width at which mobile is considered. Default is 768px.
 * @returns {boolean} - Returns true if the window width is smaller than or equal to the breakpoint.
 */
export const isMobile = (breakpoint: number = 768): boolean => {
  // Check if we're on the client-side (since window is not defined on the server)
  if (typeof window === "undefined") return false;

  // Return true if the current window width is less than or equal to the breakpoint
  return window.innerWidth <= breakpoint;
};

/**
 * Hook-style utility to listen for window resize and track if the current width is considered mobile.
 * This is especially useful for React components where you want to respond to resizing events.
 *
 * @param {function} callback - The callback function to invoke when the window size changes.
 * @param {number} breakpoint - The pixel width at which mobile is considered. Default is 768px.
 * @returns {function} - Returns a cleanup function to remove the resize listener.
 */
export const listenForMobileChange = (
  callback: (isMobile: boolean) => void,
  breakpoint: number = 768
): (() => void) | undefined => {
  // Resize handler callback that updates the mobile state
  const handleResize = () => {
    // Check if the window width is smaller than or equal to the breakpoint and call the callback
    callback(window.innerWidth <= breakpoint);
  };

  // If the code is running on the client-side
  if (typeof window !== "undefined") {
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initial call to handleResize to check the current window size
    handleResize();

    // Return a cleanup function to remove the event listener when no longer needed
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }

  // If we're on the server (window is undefined), we just return undefined as there's nothing to clean up
  return undefined;
};
