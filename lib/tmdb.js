const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function tmdbFetch(endpoint, params = {}, retries = 2) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
      return await res.json();
    } catch (error) {
      if (i === retries) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, i)));
    }
  }
}

export async function searchMulti(query) {
  if (!query) return { results: [] };
  return tmdbFetch("/search/multi", { query, include_adult: "false" });
}

export async function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,videos,similar",
  });
}

export async function getTVDetails(id) {
  return tmdbFetch(`/tv/${id}`, {
    append_to_response: "credits,videos,similar",
  });
}

export async function getTVSeasonDetails(tvId, seasonNumber) {
  return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}`);
}

export async function getGenres() {
  const [movieGenres, tvGenres] = await Promise.all([
    tmdbFetch("/genre/movie/list"),
    tmdbFetch("/genre/tv/list"),
  ]);

  const genreMap = new Map();
  [...movieGenres.genres, ...tvGenres.genres].forEach((g) => {
    genreMap.set(g.id, g.name);
  });

  return Array.from(genreMap, ([id, name]) => ({ id, name })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export async function discoverMovies({
  genreId,
  minRating,
  yearGte,
  yearLte,
  providerId,
  watchRegion = "US",
  page = 1,
} = {}) {
  const params = {
    sort_by: "popularity.desc",
    include_adult: "false",
    page,
  };
  if (genreId) params.with_genres = genreId;
  if (minRating) params["vote_average.gte"] = minRating;
  if (yearGte) params["primary_release_date.gte"] = `${yearGte}-01-01`;
  if (yearLte) params["primary_release_date.lte"] = `${yearLte}-12-31`;
  if (providerId) {
    params.with_watch_providers = providerId;
    params.watch_region = watchRegion;
  }

  return tmdbFetch("/discover/movie", params);
}

export async function getTopRated(mediaType = "movie", page = 1) {
  return tmdbFetch(`/${mediaType}/top_rated`, { page, include_adult: "false" });
}

export async function getTrending(mediaType = "all", timeWindow = "week") {
  return tmdbFetch(`/trending/${mediaType}/${timeWindow}`);
}

export function getPosterUrl(path, size = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path, size = "original") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
