import { FC } from "react";
import { Fade } from "react-swift-reveal";
import { Movie } from "../../types/types.ts";

interface MovieTileProps {
  movie: Movie;
}

export const MovieTile: FC<MovieTileProps> = ({ movie }) => {
  const { poster_path, title, original_title } = movie;

  const formattedEntries = Object.entries(movie)
    .filter(
      ([key]) =>
        key.toUpperCase() === "Overview".toUpperCase() ||
        key === "release_date",
    )
    .map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
    ));

  return (
    <Fade delay={500}>
      <div
        className="card movie-tile"
        style={{
          border: "5px solid black",
          borderRadius: 5,
          width: 400,
          padding: 20,
          minHeight: 400,
        }}
      >
        <h2 style={{ textAlign: "center", height: 50 }}>{title}</h2>
        {poster_path && (
          <img
            alt={`${original_title}-poster`}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            style={{ minHeight: 500 }}
            width="100%"
          />
        )}
        <div style={{ textAlign: "start", padding: 10, lineHeight: "15px" }}>
          <ul>
            {formattedEntries.map((entry, idx) => (
              <li
                key={idx}
                style={{
                  textAlign: "justify",
                }}
              >
                {entry}
              </li>
            ))}
          </ul>
          {/*<p>{`Release Date: ${release_date}`}</p>*/}
          {/*<p>{`Adult rated?: ${adult ? "yes" : "no"}`}</p>*/}
          {/*{character && <p>{`Character?: ${character}`}</p>}*/}
        </div>
      </div>
    </Fade>
  );
};
