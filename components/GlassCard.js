import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";

export default function GlassCard({ item }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date || "";
  const year = date.slice(0, 4);
  const type = item.media_type === "tv" || item.first_air_date ? "tv" : "movie";
  const posterUrl = getPosterUrl(item.poster_path, "w342");

  return (
    <Link href={`/${type}/${item.id}`} className="glass-card" id={`card-${type}-${item.id}`}>
      <div className="card-poster-wrapper">
        {posterUrl ? (
          <img src={posterUrl} alt={title} loading="lazy" />
        ) : (
          <div className="no-poster">🎬</div>
        )}
        <div className="card-poster-overlay">
          <div className="play-icon">▶</div>
        </div>
      </div>
      <div className="card-info">
        <div className="card-title">{title}</div>
        <div className="card-meta">
          <span>{year}</span>
          {item.vote_average > 0 && (
            <span className="card-rating">
              ⭐ {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
