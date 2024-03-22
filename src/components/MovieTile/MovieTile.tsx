import { FC } from "react";
import { Fade } from "react-swift-reveal";
import { Movie } from "../../api";

interface MovieTileProps {
  movie: Movie;
}

export const MovieTile: FC<MovieTileProps> = ({ movie }) => {
  const { poster_path, title, original_title, release_date, adult, character } =
    movie;
  return (
    <Fade delay={500}>
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
        <h3 style={{ textAlign: "start", height: 50 }}>{`- ${title}`}</h3>
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
  );
};
