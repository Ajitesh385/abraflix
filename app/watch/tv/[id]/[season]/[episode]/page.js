import Link from "next/link";
import { getTVDetails } from "@/lib/tmdb";

export default async function WatchTVPage({ params }) {
  const { id, season, episode } = await params;

  let show = { name: "Loading..." };
  try {
    show = await getTVDetails(id);
  } catch {}

  const embedUrl = `https://vidlink.pro/tv/${id}/${season}/${episode}`;

  const prevEp = parseInt(episode) > 1 ? parseInt(episode) - 1 : null;
  const nextEp = parseInt(episode) + 1;

  return (
    <div className="watch-page">
      <div className="watch-header">
        <Link href={`/tv/${id}`} className="watch-back" id="back-button">
          ← Back
        </Link>
        <span className="watch-title" id="watch-title">
          {show.name} — S{season}E{episode}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          {prevEp && (
            <Link
              href={`/watch/tv/${id}/${season}/${prevEp}`}
              className="glass-button"
              style={{ padding: "6px 16px", fontSize: "13px" }}
              id="prev-episode"
            >
              ← Prev
            </Link>
          )}
          <Link
            href={`/watch/tv/${id}/${season}/${nextEp}`}
            className="glass-button"
            style={{ padding: "6px 16px", fontSize: "13px" }}
            id="next-episode"
          >
            Next →
          </Link>
        </div>
      </div>

      <div className="watch-iframe-container">
        <iframe
          src={embedUrl}
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="origin"
          id="video-player"
          title={`${show.name} S${season}E${episode}`}
        />
      </div>
    </div>
  );
}
