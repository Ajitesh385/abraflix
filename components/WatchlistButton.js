"use client";

import { useWatchlist } from "@/lib/hooks";

export default function WatchlistButton({ item }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  if (!item || !item.id) return null;

  const inList = isInWatchlist(item.id);

  const toggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.title ? "movie" : "tv"
      });
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      style={{
        background: inList ? "var(--glass-bg-hover)" : "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        color: "var(--text-primary)",
        padding: "12px 24px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "var(--glass-shadow)",
        transition: "all 0.2s ease"
      }}
    >
      {inList ? "✓ In Watchlist" : "+ Add to Watchlist"}
    </button>
  );
}
