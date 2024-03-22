import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getMoviesInvolvingActors } from "./api";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState<string[]>([]);

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

  useEffect(() => {
    console.log("movies");
    console.log(movies);
  }, [movies]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {movies && (
        <h2>
          {Array.from(movies).map((e) => (
            <h3 style={{ textAlign: "start" }}>{`- ${e}`}</h3>
          ))}
        </h2>
      )}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
