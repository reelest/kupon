import { useRef } from "react";
export default function mutex(func) {
  let mutex = false;
  return async (...args) => {
    if (mutex) return console.warn("Ignoring click due to mutex");
    try {
      mutex = true;
      return await func(...args);
    } finally {
      mutex = false;
    }
  };
}

export const useMutex = (func, wrapper = mutex) => {
  const ref = useRef({
    cb: wrapper((...args) => ref.current.handler(...args)),
  });
  ref.current.handler = func;
  return func && ref.current.cb;
};
