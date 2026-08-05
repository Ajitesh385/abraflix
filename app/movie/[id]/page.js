import Link from "next/link";
import { getMovieDetails, getPosterUrl, getBackdropUrl } from "@/lib/tmdb";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = (movie.release_date || "").slice(0, 4);
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;
  const cast = movie.credits?.cast?.slice(0, 12) || [];

  return (
    <div className="detail-page">
      {/* Backdrop */}
      <div className="detail-backdrop">
        {backdropUrl && <img src={backdropUrl} alt="" />}
        <div className="detail-backdrop-overlay" />
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="detail-header">
          {/* Poster */}
          <div className="detail-poster glass">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="no-poster" style={{ height: 330 }}>🎬</div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-title" id="movie-title">{movie.title}</h1>

            <div className="detail-meta">
              {movie.vote_average > 0 && (
                <span className="detail-rating">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              )}
              {year && <span>{year}</span>}
              {runtime && <span>{runtime}</span>}
              <span
                className="search-result-badge badge-movie"
                style={{ fontSize: 11 }}
              >
                Movie
              </span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="detail-genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {movie.overview && (
              <p className="detail-overview">{movie.overview}</p>
            )}

            <div className="detail-actions">
              <Link
                href={`/watch/movie/${movie.id}`}
                className="glass-button glass-button-primary glass-button-lg"
                id="watch-now-button"
              >
                ▶ Watch Now
              </Link>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="cast-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-scroll">
              {cast.map((person) => (
                <div key={person.id} className="cast-card">
                  {person.profile_path ? (
                    <img
                      src={getPosterUrl(person.profile_path, "w185")}
                      alt={person.name}
                      className="cast-avatar"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="cast-avatar"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      👤
                    </div>
                  )}
                  <div className="cast-name">{person.name}</div>
                  <div className="cast-character">{person.character}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {movie.similar?.results?.length > 0 && (
          <div className="cast-section">
            <h2 className="section-title">Similar Movies</h2>
            <div className="cast-scroll" style={{ gap: "16px" }}>
              {movie.similar.results.slice(0, 10).map((sim) => (
                <Link
                  key={sim.id}
                  href={`/movie/${sim.id}`}
                  className="glass-card"
                  style={{
                    flexShrink: 0,
                    width: 150,
                  }}
                >
                  <div className="card-poster-wrapper" style={{ height: 225 }}>
                    {sim.poster_path ? (
                      <img
                        src={getPosterUrl(sim.poster_path, "w342")}
                        alt={sim.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-poster">🎬</div>
                    )}
                  </div>
                  <div className="card-info">
                    <div className="card-title">{sim.title}</div>
                    <div className="card-meta">
                      <span>
                        {(sim.release_date || "").slice(0, 4)}
                      </span>
                      {sim.vote_average > 0 && (
                        <span className="card-rating">
                          ⭐ {sim.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
