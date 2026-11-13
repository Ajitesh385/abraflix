import SearchBar from "@/components/SearchBar";
import RandomMovieButton from "@/components/RandomMovieButton";
import { getTrending, getPosterUrl, getTopRated, getGenres } from "@/lib/tmdb";
import Link from "next/link";
import DynamicHero from "@/components/DynamicHero";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
  const [trendingData, topRatedData, genresData] = await Promise.allSettled([
    getTrending("movie", "day"),
    getTopRated("movie", 1),
    getGenres()
  ]);

  const trendingMovies = trendingData.status === "fulfilled" ? trendingData.value.results || [] : [];
  const topRatedMovies = topRatedData.status === "fulfilled" ? topRatedData.value.results || [] : [];
  const genres = genresData.status === "fulfilled" ? genresData.value || [] : [];

  const handpicked = trendingMovies.slice(0, 4);
  const top10Today = trendingMovies.slice(0, 10);
  const topRated = topRatedMovies.slice(0, 10);
  const topGenres = genres.slice(0, 12);

  const years = [2024, 2023, 2022, 2021, 2020, 2010, 2000, 1990];

  const providers = [
    { id: 8, name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { id: 9, name: "Amazon Prime Video", logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" },
    { id: 337, name: "Disney+", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
    { id: 384, name: "Max", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg" },
    { id: 15, name: "Hulu", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg" },
    { id: 350, name: "Apple TV+", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg" },
    { id: 531, name: "Paramount+", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg" }
  ];

  return (
    <div className="page-container">
      <DynamicHero />

      <section className="handpicked-section">
        <div className="handpicked-header">
          <h2>Handpicked for tonight</h2>
          <Link href="/search?type=movie" className="view-all-link">View all</Link>
        </div>
        <div className="handpicked-grid">
          {handpicked.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="handpicked-card">
              <div className="handpicked-card-bg">
                {movie.poster_path ? (
                  <img src={getPosterUrl(movie.poster_path, "w500")} alt={movie.title} />
                ) : null}
                <div className="handpicked-card-overlay"></div>
              </div>
              <div className="handpicked-card-info">
                <span className="handpicked-meta">
                  TRENDING - {(movie.release_date || "").slice(0, 4)}
                </span>
                <h3 className="handpicked-title">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top 10 Today */}
      <section className="movie-row-section">
        <div className="section-header">
          <h2>Top 10 Today</h2>
        </div>
        <div className="movie-row-container">
          {top10Today.map((movie, idx) => (
            <MovieCard movie={movie} rank={idx + 1} key={movie.id} />
          ))}
        </div>
      </section>

      {/* Highest Rated */}
      <section className="movie-row-section">
        <div className="section-header">
          <h2>Highest Rated</h2>
        </div>
        <div className="movie-row-container">
          {topRated.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>

      {/* Streaming Providers */}
      <section className="movie-row-section">
        <div className="section-header">
          <h2>Available on Streaming</h2>
        </div>
        <div className="pill-row">
          {providers.map(p => (
            <Link href={`/search?provider=${p.id}&type=movie`} key={p.id} className="provider-logo" title={p.name}>
              <img src={p.logo} alt={p.name} />
            </Link>
          ))}
        </div>
      </section>

      {/* By Genre */}
      <section className="movie-row-section">
        <div className="section-header">
          <h2>Browse by Genre</h2>
        </div>
        <div className="pill-row">
          {topGenres.map(g => (
            <Link href={`/search?genre=${g.id}&type=movie`} key={g.id} className="genre-pill">
              {g.name}
            </Link>
          ))}
        </div>
      </section>

      {/* By Year */}
      <section className="movie-row-section">
        <div className="section-header">
          <h2>Browse by Year</h2>
        </div>
        <div className="pill-row">
          {years.map(y => (
            <Link href={`/search?year=${y}&type=movie`} key={y} className="genre-pill">
              {y}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
