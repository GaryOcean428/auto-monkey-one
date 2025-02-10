import { useState, useEffect, useRef } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() >= lastExecuted.current + interval) {
          setThrottledValue(value);
          lastExecuted.current = Date.now();
        }
      },
      interval - (Date.now() - lastExecuted.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, interval]);

  return throttledValue;
}
