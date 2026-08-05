import Link from "next/link";
import { getMovieDetails } from "@/lib/tmdb";

export default async function WatchMoviePage({ params }) {
  const { id } = await params;

  let movie = { title: "Loading..." };
  try {
    movie = await getMovieDetails(id);
  } catch {}

  const embedUrl = `https://vidlink.pro/movie/${id}`;

  return (
    <div className="watch-page">
      <div className="watch-header">
        <Link href={`/movie/${id}`} className="watch-back" id="back-button">
          ← Back
        </Link>
        <span className="watch-title" id="watch-title">
          {movie.title}
        </span>
      </div>

      <div className="watch-iframe-container">
        <iframe
          src={embedUrl}
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="origin"
          id="video-player"
          title={movie.title}
        />
      </div>
    </div>
  );
}
