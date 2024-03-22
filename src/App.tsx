import { useState } from "react";
import { useMoviesInvolvingActors } from "./hooks/useMoviesInvolvingActors.ts";

import { MovieTile } from "./components/MovieTile";
import { Modal } from "./components/Modal";

import { Header } from "./components/Header";

import { Movie } from "./types/types.ts";

import "./App.css";
import { TitleSection } from "./components/TitleSection";
import { Spinner } from "./components/Spinner";
import { BodyWrapper } from "./App.styles.ts";

export function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { movies, fetchState } = useMoviesInvolvingActors(
    "Christopher Nolan",
    "Cillian Murphy",
  );

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Header />
      <TitleSection />
      <BodyWrapper>
        {fetchState === "fetching" && <Spinner />}
        {fetchState === "idle" && movies.length === 0 && (
          <div>No common movies found</div>
        )}

        {fetchState === "idle" &&
          movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
              <MovieTile movie={movie} />
            </div>
          ))}
      </BodyWrapper>
      <Modal
        isOpen={selectedMovie !== null}
        onClose={closeModal}
        movie={selectedMovie}
      />
    </>
  );
}
