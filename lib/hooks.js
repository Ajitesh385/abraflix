"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage("abraflix-watchlist", []);

  const addToWatchlist = (item) => {
    setWatchlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [{ ...item, addedAt: Date.now() }, ...prev];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((i) => i.id === id);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}

export function useHistory() {
  const [history, setHistory] = useLocalStorage("abraflix-history", []);

  const addToHistory = (item) => {
    setHistory((prev) => {
      // Remove it if it already exists, so we can push it to the top
      const filtered = prev.filter((i) => i.id !== item.id);
      // Cap at 100 items
      const newHistory = [{ ...item, viewedAt: Date.now() }, ...filtered];
      return newHistory.slice(0, 100);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}
