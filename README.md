<div align="center">
  <h1>🍿 Abraflix</h1>
  <p><strong>A modern, sleek movie and TV show discovery and streaming platform.</strong></p>
</div>

---

## 🌟 Overview

Abraflix is a premium web application built to help you discover, explore, and stream your favorite movies and TV shows effortlessly. Featuring a stunning dark-mode glassmorphism design, Abraflix provides a seamless, immersive experience from discovery to playback.

## ✨ Features

- **Rich Discovery Hub:** Browse curated categories on the homepage including "Top 10 Today," "Highest Rated," and "Handpicked for tonight."
- **Advanced Filtering:** Dive deep into the catalog by browsing through specific genres, release years, or your favorite streaming providers (Netflix, Prime, Disney+, Max, etc.).
- **Universal Search:** Quickly find any movie or TV show using the blazing-fast search engine.
- **"Surprise Me!" Feature:** Can't decide what to watch? Use the "Roll the Dice" button to randomly select a highly-rated movie based on your preferred genre and minimum rating.
- **Detailed Insights:** View comprehensive details for any title, including cast members, runtime, release year, overviews, and similar recommendations.
- **Seamless Streaming:** Watch movies and TV shows directly within the app using a built-in, fast, and ad-free video player (powered by Vidlink.pro).

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Frontend Library:** [React](https://reactjs.org/)
- **Styling:** Vanilla CSS with custom design tokens and glassmorphism aesthetics.
- **Data Source:** [TMDB (The Movie Database) API](https://www.themoviedb.org/documentation/api)

## 🚀 Getting Started

Follow these steps to run Abraflix locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Ajitesh385/abraflix.git
cd abraflix
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root of your project and add your TMDB API key:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
*(You can get a free API key by creating an account at [The Movie Database](https://www.themoviedb.org/).)*

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
