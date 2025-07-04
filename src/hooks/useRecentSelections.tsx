import { useState, useEffect } from 'react';
import {BasicNode} from "@/types";

const LOCAL_STORAGE_KEY = 'recentSelections';
const MAX_RECENT_SELECTIONS = 5;

export function useRecentSelections() {
  const [recentSelections, setRecentSelections] = useState<BasicNode[]>([]);

  useEffect(() => {
    try {
      const storedSelections = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSelections) {
        setRecentSelections(JSON.parse(storedSelections));
      }
    } catch (error) {
      console.error("Failed to load recent selections from localStorage", error);
    }
  }, []);

  const addRecentSelection = (selection: BasicNode) => {
    setRecentSelections((prevSelections) => {
      const newSelections = [selection, ...prevSelections.filter(s => s.id !== selection.id)];
      const limitedSelections = newSelections.slice(0, MAX_RECENT_SELECTIONS);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(limitedSelections));
      } catch (error) {
        console.error("Failed to save recent selections to localStorage", error);
      }
      return limitedSelections;
    });
  };

  const removeRecentSelection = (id: string) => {
    setRecentSelections((prevSelections) => {
      const newSelections = prevSelections.filter(s => s.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSelections));
      } catch (error) {
        console.error("Failed to save recent selections to localStorage", error);
      }
      return newSelections;
    });
  };

  return { recentSelections, addRecentSelection, removeRecentSelection };
}
