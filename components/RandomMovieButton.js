"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getGenres, discoverMovies } from "@/lib/tmdb";

export default function RandomMovieButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const popoverRef = useRef(null);

  useEffect(() => {
    let active = true;
    getGenres()
      .then((data) => {
        if (active) setGenres(data);
      })
      .catch((err) => {
        console.error("Failed to load movie genres:", err);
        if (active) setError("Genres could not be loaded. You can still pick any movie.");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleRoll() {
    setIsLoading(true);
    setError("");
    try {
      // Fetch a random page of results
      const randomPage = Math.floor(Math.random() * 5) + 1;
      const data = await discoverMovies({
        genreId: selectedGenre || undefined,
        minRating: minRating > 0 ? minRating : undefined,
        page: randomPage,
      });

      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const movie = data.results[randomIndex];
        setIsOpen(false);
        router.push(`/movie/${movie.id}`);
      } else {
        setError("No movies match those filters. Try lowering the rating.");
      }
    } catch (err) {
      console.error("Failed to get random movie:", err);
      setError("Could not find a movie right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="surprise-wrapper" ref={popoverRef}>
      {isOpen && (
        <div className="surprise-popover glass-strong" id="surprise-popover">
          <div className="popover-field">
            <label className="popover-label" htmlFor="genre-select">Genre</label>
            <select
              className="glass-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              id="genre-select"
            >
              <option value="">Any Genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {error && !isLoading && (
              <p className="surprise-error" role="alert">{error}</p>
            )}
          </div>

          <div className="popover-field">
            <label className="popover-label">
              Min Rating: {minRating.toFixed(1)}
            </label>
            <input
              type="range"
              className="glass-range"
              min="0"
              max="9"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              id="rating-slider"
            />
          </div>

          <button
            type="button"
            className="glass-button glass-button-primary glass-button-lg"
            onClick={handleRoll}
            disabled={isLoading}
            id="roll-dice-button"
            style={{ width: "100%" }}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                Finding...
              </>
            ) : (
              "🎲 Roll the Dice"
            )}
          </button>
        </div>
      )}

      <button
        type="button"
        className="glass-button surprise-btn-revamp"
        onClick={() => {
          setError("");
          setIsOpen((open) => !open);
        }}
        aria-expanded={isOpen}
        aria-controls="surprise-popover"
        id="surprise-me-button"
      >
        Surprise me
      </button>
    </div>
  );
}
