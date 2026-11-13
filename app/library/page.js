"use client";

import { useState } from "react";
import { useWatchlist, useHistory } from "@/lib/hooks";
import MovieCard from "@/components/MovieCard";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("watchlist");
  const { watchlist } = useWatchlist();
  const { history, clearHistory } = useHistory();

  return (
    <div className="page-container" style={{ minHeight: "80vh" }}>
      <div className="library-header" style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        <h1 className="hero-headline" style={{ fontSize: "3rem" }}>my library</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "var(--space-2)" }}>
          Your personal collection, saved locally.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "var(--space-8)" }}>
        <button
          onClick={() => setActiveTab("watchlist")}
          className={`glass-button ${activeTab === "watchlist" ? "active" : ""}`}
          style={{
            background: activeTab === "watchlist" ? "var(--accent-glow)" : "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-primary)",
            padding: "12px 32px",
            borderRadius: "9999px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Watchlist ({watchlist.length})
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`glass-button ${activeTab === "history" ? "active" : ""}`}
          style={{
            background: activeTab === "history" ? "var(--accent-glow)" : "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-primary)",
            padding: "12px 32px",
            borderRadius: "9999px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          History ({history.length})
        </button>
      </div>

      {activeTab === "watchlist" && (
        <div>
          {watchlist.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-tertiary)", marginTop: "64px" }}>
              Your watchlist is empty. Go find some great movies!
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "24px",
              padding: "0 16px"
            }}>
              {watchlist.map((item) => (
                <MovieCard key={`wl-${item.id}`} movie={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", padding: "0 16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700 }}>Recently Viewed</h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                style={{
                  background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "14px", fontWeight: 600
                }}
              >
                Clear History
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-tertiary)", marginTop: "64px" }}>
              You haven't viewed any movies or shows yet.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "24px",
              padding: "0 16px"
            }}>
              {history.map((item) => (
                <MovieCard key={`hist-${item.id}`} movie={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
