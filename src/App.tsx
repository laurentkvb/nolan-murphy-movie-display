import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import { useMoviesInvolvingActors } from "./hooks/useMoviesInvolvingActors.ts";

import spinner from "./assets/spinner.gif";
import NolanMurphy from "./assets/Nolan-Murphy.png";

import { Fade } from "react-swift-reveal";

import "./App.css";

function App() {
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
          Array.from(movies).map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
}

export default App;
