import { useState } from 'react';

function useForceUpdate() {
  const [value, setState] = useState(true);
  return () => setState(!value);
}

export default useForceUpdate;
