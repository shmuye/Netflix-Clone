# Netflix Clone Application

A responsive, feature-rich Netflix clone built with React, TypeScript, and Tailwind CSS. It uses the TMDB (The Movie Database) API to fetch and display movies, trailers, and other details.

## 🚀 Features

- **Browse Movies:** View Popular, Trending, and Top Rated movies.
- **Search:** Search for movies by title.
- **Movie Details:** Click on a movie to see details in a modal window.
- **Watch Trailers:** Watch movie trailers directly in the app.
- **My List:** Add and remove favorite movies to/from your personal list.
- **Responsive Design:** Fully responsive layout that works on desktop, tablet, and mobile devices.
- **Interactive UI:** Hover effects and pop-up cards similar to the actual Netflix interface.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router v7
- **Data Fetching:** Axios
- **API:** [TMDB (The Movie Database) API](https://developer.themoviedb.org/docs/getting-started)
- **Icons:** Lucide React
- **Video Player:** React Player
- **Notifications:** React Hot Toast

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A free TMDB API key. You can get one by creating an account at [The Movie Database (TMDB)](https://www.themoviedb.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd netflix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📜 Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Starts the development server.             |
| `npm run build`   | Compiles TypeScript and builds for production.|
| `npm run lint`    | Runs ESLint to check for code quality issues.|
| `npm run preview` | Previews the production build locally.       |
