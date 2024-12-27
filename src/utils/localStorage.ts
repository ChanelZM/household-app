/**
 * Typed wrapper for localStorage with automatic JSON serialization/deserialization
 */

/* eslint-disable filenames/match-exported */
const storage = {
  get<T>(key: string, defaultValue: T): string | T {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        return defaultValue;
      }
      return JSON.parse(value) as T;
    } catch (e) {
      console.warn("Reading from localStorage failed", e);
      return defaultValue;
    }
  },
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Saving to localStorage failed", e);
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Removing from localStorage failed", e);
    }
  },
  isAvailable(): boolean {
    try {
      const key = "has-localStorage";
      storage.set(key, null);
      storage.remove(key);
      return true;
    } catch (e) {
      console.warn("Local storage is not available", e);
      return false;
    }
  },
};

export default storage;
