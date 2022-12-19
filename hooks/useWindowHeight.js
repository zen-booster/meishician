/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';

export const useWindowHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setHeight]);

  return height;
};
