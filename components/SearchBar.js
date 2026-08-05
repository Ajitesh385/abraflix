"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchMulti, getPosterUrl } from "@/lib/tmdb";

export default function SearchBar({ className = "", autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchMulti(val.trim());
        const filtered = data.results
          .filter((r) => r.media_type === "movie" || r.media_type === "tv")
          .slice(0, 8);
        setResults(filtered);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
      setIsLoading(false);
    }, 350);
  }

  function handleSelect(item) {
    setIsOpen(false);
    setQuery("");
    const type = item.media_type === "movie" ? "movie" : "tv";
    router.push(`/${type}/${item.id}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div ref={wrapperRef} className={`hero-search-wrapper ${className}`}>
      <form onSubmit={handleSubmit}>
        <span className="hero-search-icon">🔍</span>
        <input
          type="text"
          className="glass-input hero-search-input"
          placeholder="Search a title, actor, or mood..."
          value={query}
          onChange={handleChange}
          autoFocus={autoFocus}
          id="search-input"
        />
      </form>

      {isOpen && results.length > 0 && (
        <div className="search-dropdown glass-strong">
          {results.map((item) => (
            <div
              key={`${item.media_type}-${item.id}`}
              className="search-result-item"
              onClick={() => handleSelect(item)}
            >
              {item.poster_path ? (
                <img
                  src={getPosterUrl(item.poster_path, "w92")}
                  alt=""
                  className="search-result-poster"
                />
              ) : (
                <div className="search-result-poster no-poster">🎬</div>
              )}
              <div className="search-result-info">
                <div className="search-result-title">
                  {item.title || item.name}
                </div>
                <div className="search-result-meta">
                  <span
                    className={`search-result-badge ${
                      item.media_type === "movie" ? "badge-movie" : "badge-tv"
                    }`}
                  >
                    {item.media_type === "movie" ? "Movie" : "TV"}
                  </span>
                  <span>
                    {(item.release_date || item.first_air_date || "").slice(
                      0,
                      4
                    )}
                  </span>
                  {item.vote_average > 0 && (
                    <span>⭐ {item.vote_average.toFixed(1)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && isOpen && (
        <div className="search-dropdown glass-strong" style={{ padding: "24px", textAlign: "center" }}>
          <div className="loading-spinner" style={{ margin: "0 auto" }}></div>
        </div>
      )}
    </div>
  );
}
