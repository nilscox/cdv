import { useRef, useEffect } from 'react';

const useUpdateEffect = (effect: Function, deps: React.DependencyList = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
