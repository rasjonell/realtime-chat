import { useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setStoredValue] = useState(() => {
    try {
      const val = window.localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn('unable to update value', error);
    } finally {
      setStoredValue(newValue);
    }
  };

  return [value, setValue];
}
