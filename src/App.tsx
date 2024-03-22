import { useState } from "react";
import { useMoviesInvolvingActors } from "./hooks/useMoviesInvolvingActors.ts";

import { MovieTile } from "./components/MovieTile";
import { Modal } from "./components/Modal";

import spinner from "./assets/spinner.gif";
import NolanMurphy from "./assets/Nolan-Murphy.png";

import { Fade } from "react-swift-reveal";
import { Movie } from "./types/types.ts";

import "./App.css";

export function App() {
  const { movies, fetchState } = useMoviesInvolvingActors(
    "Christopher Nolan",
    "Cillian Murphy",
  );
  const textSegments = [
    "Christopher Nolan",
    "&",
    "Cillian Murphy",
    "Movie Collaborations",
  ];
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div>
        <img
          src={NolanMurphy}
          className="logo react"
          alt="Nolan and Murphy in a heartshape"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {textSegments.map((segment, index) => (
          <h1 key={index} style={{ lineHeight: "20px" }}>
            {segment}
          </h1>
        ))}
      </div>
      <div
        style={{
          marginTop: 100,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {fetchState === "fetching" && (
          <Fade>
            <div>
              <img src={spinner} alt="spinner gif for loading" />
            </div>
          </Fade>
        )}
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
      </div>
      <Modal
        isOpen={selectedMovie !== null}
        onClose={closeModal}
        movie={selectedMovie}
      />
    </>
  );
}
