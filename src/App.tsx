import { useEffect, useState } from "react";
import { getMoviesInvolvingActors, Movie } from "./api";
import { Fade } from "react-swift-reveal";

import NolanMurphy from "./assets/Nolan-Murphy.png";
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
          <img src={NolanMurphy} className="logo react" alt="React logo" />
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
          Array.from(movies).map(
            (
              {
                title,
                poster_path,
                original_title,
                release_date,
                adult,
                character,
              },
              idx,
            ) => (
              <Fade delay={500 * idx}>
                <div
                  className="card"
                  style={{
                    border: "5px solid black",
                    borderRadius: 5,
                    width: 300,
                    height: "100%",
                    padding: 20,
                    minHeight: 800,
                  }}
                >
                  <h3
                    style={{ textAlign: "start", height: 50 }}
                  >{`- ${title}`}</h3>
                  {poster_path && (
                    <img
                      alt={`${original_title}-poster`}
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      style={{ minHeight: 500 }}
                      width="100%"
                    />
                  )}
                  <div style={{ textAlign: "start", padding: 10 }}>
                    <p>{`Release Date: ${release_date}`}</p>
                    <p>{`Adult rated?: ${adult ? "yes" : "no"}`}</p>
                    {character && <p>{`Character?: ${character}`}</p>}
                  </div>
                </div>
              </Fade>
            ),
          )}
      </div>
    </>
  );
}

export default App;
