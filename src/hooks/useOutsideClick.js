import { useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);

  function handleOutsideClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  }

  function setRef(node) {
    if (ref.current) {
      document.removeEventListener(
        'click',
        handleOutsideClick,
        listenCapturing
      );
    }

    if (node) {
      document.addEventListener('click', handleOutsideClick, listenCapturing);
    }

    ref.current = node;
  }

  return setRef;
}
