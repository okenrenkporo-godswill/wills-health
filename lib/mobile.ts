// lib/mobile.ts

/**
 * Checks if the current window width is considered mobile.
 * You can customize the breakpoint (default is 768px).
 */
export const isMobile = (breakpoint: number = 768): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= breakpoint;
};

/**
 * Hook-style alternative using a resize listener.
 * For use in React components to dynamically track mobile state.
 */
export const listenForMobileChange = (
  callback: (isMobile: boolean) => void,
  breakpoint: number = 768
) => {
  const handleResize = () => {
    callback(window.innerWidth <= breakpoint);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
};
