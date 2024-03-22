import { useEffect, useState } from "react";
import { getMoviesInvolvingActors, Movie } from "./api";
import NolanMurphy from "./assets/Nolan-Murphy.png";
import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const textSegments = [
    "Christopher Nolan",
    "&",
    "Cillian Murphy",
    "Movie Collaborations",
  ];

  useEffect(() => {
    getMoviesInvolvingActors("Christopher Nolan", "Cillian Murphy")
      .then((movies) => {
        setMovies(movies);
        console.log("Movies involving both actors:", movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img
            src={NolanMurphy}
            className="logo react"
            alt="Nolan and Murphy in a heartshape"
          />
        </a>
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
        {movies &&
          Array.from(movies).map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
}

export default App;
