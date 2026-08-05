import { searchMulti, getTrending, discoverMovies } from "@/lib/tmdb";
import GlassCard from "@/components/GlassCard";

export default async function SearchPage({ searchParams }) {
  const { q, type, genre, year, provider } = await searchParams;

  let results = [];
  let pageTitle = "";

  if (q) {
    const data = await searchMulti(q);
    results = data.results.filter(
      (r) => r.media_type === "movie" || r.media_type === "tv"
    );
    pageTitle = q;
  } else if (genre || year || provider) {
    const data = await discoverMovies({
      genreId: genre,
      yearGte: year,
      yearLte: year,
      providerId: provider
    });
    results = data.results.map((r) => ({ ...r, media_type: type || "movie" }));
    if (genre) pageTitle = "Genre Discovery";
    else if (year) pageTitle = `Movies from ${year}`;
    else if (provider) pageTitle = "Streaming Discovery";
  } else if (type === "movie") {
    const data = await getTrending("movie");
    results = data.results.map((r) => ({ ...r, media_type: "movie" }));
    pageTitle = "Trending Movies";
  } else if (type === "tv") {
    const data = await getTrending("tv");
    results = data.results.map((r) => ({ ...r, media_type: "tv" }));
    pageTitle = "Trending TV Shows";
  } else {
    const data = await getTrending("all");
    results = data.results.filter(
      (r) => r.media_type === "movie" || r.media_type === "tv"
    );
    pageTitle = "Trending";
  }

  return (
    <div className="search-page" style={{ paddingTop: "100px" }}>
      <h1 className="search-page-title" style={{ padding: "0 2rem", marginBottom: "2rem" }}>
        {q ? (
          <>
            Results for{" "}
            <span className="search-page-query">&ldquo;{q}&rdquo;</span>
          </>
        ) : (
          <span className="search-page-query">{pageTitle}</span>
        )}
      </h1>

      {results.length > 0 ? (
        <div className="results-grid" style={{ padding: "0 2rem 4rem" }}>
          {results.map((item) => (
            <GlassCard key={`${item.media_type}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--text-tertiary)",
          }}
        >
          <p style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</p>
          <p>No results found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
