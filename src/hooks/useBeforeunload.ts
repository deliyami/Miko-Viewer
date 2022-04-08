import { useEffect, useRef } from 'react';

export const useBeforeunload = (handler: (event: BeforeUnloadEvent) => void) => {
  const eventListenerRef = useRef<any>();

  useEffect(() => {
    eventListenerRef.current = (event: BeforeUnloadEvent) => {
      const returnValue = handler?.(event);
      // Handle legacy `event.returnValue` property
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      if (typeof returnValue === 'string') {
        event.returnValue = returnValue;
        return;
      }
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
      if (event.defaultPrevented) {
        event.returnValue = '';
      }
    };
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: BeforeUnloadEvent) => eventListenerRef.current(event);
    window.addEventListener('beforeunload', eventListener, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', eventListener, { capture: true });
    };
  }, []);
};
