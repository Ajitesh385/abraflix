import Link from "next/link";
import { getTVDetails, getTVSeasonDetails, getPosterUrl, getBackdropUrl } from "@/lib/tmdb";

export default async function TVDetailPage({ params }) {
  const { id } = await params;
  const show = await getTVDetails(id);

  const backdropUrl = getBackdropUrl(show.backdrop_path);
  const posterUrl = getPosterUrl(show.poster_path);
  const year = (show.first_air_date || "").slice(0, 4);
  const cast = show.credits?.cast?.slice(0, 12) || [];
  const seasons = (show.seasons || []).filter((s) => s.season_number > 0);

  // Get first season episodes by default
  let firstSeasonEpisodes = [];
  if (seasons.length > 0) {
    try {
      const seasonData = await getTVSeasonDetails(id, seasons[0].season_number);
      firstSeasonEpisodes = seasonData.episodes || [];
    } catch {}
  }

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
          <div className="detail-poster glass">
            {posterUrl ? (
              <img src={posterUrl} alt={show.name} />
            ) : (
              <div className="no-poster" style={{ height: 330 }}>📺</div>
            )}
          </div>

          <div className="detail-info">
            <h1 className="detail-title" id="tv-title">{show.name}</h1>

            <div className="detail-meta">
              {show.vote_average > 0 && (
                <span className="detail-rating">
                  ⭐ {show.vote_average.toFixed(1)}
                </span>
              )}
              {year && <span>{year}</span>}
              {show.number_of_seasons && (
                <span>{show.number_of_seasons} Season{show.number_of_seasons > 1 ? "s" : ""}</span>
              )}
              <span className="search-result-badge badge-tv" style={{ fontSize: 11 }}>
                TV
              </span>
            </div>

            {show.genres && show.genres.length > 0 && (
              <div className="detail-genres">
                {show.genres.map((g) => (
                  <span key={g.id} className="genre-tag">{g.name}</span>
                ))}
              </div>
            )}

            {show.overview && (
              <p className="detail-overview">{show.overview}</p>
            )}

            <div className="detail-actions">
              <Link
                href={`/watch/tv/${show.id}/1/1`}
                className="glass-button glass-button-primary glass-button-lg"
                id="watch-now-button"
              >
                ▶ Watch S1E1
              </Link>
            </div>
          </div>
        </div>

        {/* Episodes */}
        {firstSeasonEpisodes.length > 0 && (
          <div className="season-picker">
            <div className="season-selector">
              <h2 className="section-title" style={{ margin: 0 }}>
                Season {seasons[0]?.season_number || 1}
              </h2>
              {seasons.length > 1 && (
                <span style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)" }}>
                  ({seasons.length} seasons available)
                </span>
              )}
            </div>

            <div className="episodes-grid">
              {firstSeasonEpisodes.map((ep) => (
                <Link
                  key={ep.episode_number}
                  href={`/watch/tv/${id}/${ep.season_number}/${ep.episode_number}`}
                  className="glass-card episode-card"
                >
                  <div className="episode-number">
                    Episode {ep.episode_number}
                  </div>
                  <div className="episode-name">
                    {ep.name}
                  </div>
                  {ep.overview && (
                    <div className="episode-overview">
                      {ep.overview}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

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
                    <div className="cast-avatar" style={{
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}>
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
      </div>
    </div>
  );
}
