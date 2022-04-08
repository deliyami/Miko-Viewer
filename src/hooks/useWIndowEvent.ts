import { useEffect } from 'react';

export const useWindowEvent = <K extends keyof WindowEventMap>(type: K, handler: (e: WindowEventMap[K]) => any, passive: boolean | AddEventListenerOptions = false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(type, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(type, handler);
    };
  });
};
