"use client";

import SearchBar from "@/components/SearchBar";
import RandomMovieButton from "@/components/RandomMovieButton";

export default function DynamicHero() {
  return (
    <section className="new-hero" aria-labelledby="home-heading">
      <div className="new-hero-content">
        <p className="hero-eyebrow">ABRAFLIX / DISCOVER</p>
        <h1 className="hero-headline" id="home-heading">
          Find something<br />worth watching.
        </h1>
        <p className="hero-description">
          Search movies and series, or let us pick your next watch.
        </p>
        <SearchBar className="new-search-bar" />
        <div className="hero-actions">
          <RandomMovieButton />
        </div>
      </div>
    </section>
  );
}
