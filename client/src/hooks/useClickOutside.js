import { useEffect, useRef } from 'react';

/**
 * A custom hook that triggers a callback when a click is detected outside of the referenced element.
 * @param {() => void} callback - The function to call when an outside click is detected.
 * @returns {React.RefObject<HTMLElement>} A ref object to be attached to the element to monitor.
 */
export const useClickOutside = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};