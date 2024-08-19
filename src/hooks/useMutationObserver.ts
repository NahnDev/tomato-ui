import { useState, useEffect, useRef, useCallback } from "react";

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function useMutationObserver(ref: React.RefObject<HTMLElement>, delay: number = 300) {
  const [rect, setRect] = useState<DOMRect>();

  const updateRect = useCallback(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  const debouncedUpdateRect = useCallback(debounce(updateRect, delay), [updateRect, delay]);

  useEffect(() => {
    const observer = new MutationObserver(debouncedUpdateRect);
    if (ref.current) {
      observer.observe(ref.current, { attributes: true });
    }
    debouncedUpdateRect();
    return () => {
      observer.disconnect();
    };
  }, [debouncedUpdateRect]);

  return rect;
}
