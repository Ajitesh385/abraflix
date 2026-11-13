import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";

export default function MovieCard({ movie, rank }) {
  const isTV = movie.media_type === "tv" || movie.name;
  const linkHref = isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`;
  const title = movie.title || movie.name;
  const releaseYear = (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <Link href={linkHref} className="movie-card">
      <div className="movie-poster-wrapper">
        {movie.poster_path ? (
          <img src={getPosterUrl(movie.poster_path, "w342")} alt={title} loading="lazy" />
        ) : (
          <div className="no-poster" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(255,255,255,0.05)' }}>🎬</div>
        )}
        {rank && (
          <div style={{
            position: 'absolute', top: 8, left: 8, background: 'var(--accent)', color: '#fff',
            fontWeight: 800, padding: '2px 8px', borderRadius: '8px', fontSize: '14px'
          }}>
            #{rank}
          </div>
        )}
      </div>
      <div className="movie-card-title" title={title}>{title}</div>
      <div className="movie-card-meta">
        {releaseYear}
        {movie.vote_average > 0 && ` • ⭐ ${movie.vote_average.toFixed(1)}`}
      </div>
    </Link>
  );
}
