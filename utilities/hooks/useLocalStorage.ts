import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
