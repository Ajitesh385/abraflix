"use client";

import { useEffect } from "react";
import { useHistory } from "@/lib/hooks";

export default function HistoryTracker({ item }) {
  const { addToHistory } = useHistory();

  useEffect(() => {
    if (item && item.id) {
      addToHistory({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.title ? "movie" : "tv"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  return null; // This component doesn't render anything
}
