import { FC } from "react";
import { Fade } from "react-swift-reveal";
import {
  ContentContainer,
  MovieTitle,
  Overview,
  PosterImage,
  ReadMoreLink,
  ReleaseDate,
  TileContainer,
} from "./MovieTile.styles";
import { Movie } from "../../types/types.ts";

interface MovieTileProps {
  movie: Movie;
}

export const MovieTile: FC<MovieTileProps> = ({ movie }) => {
  const { poster_path, title, overview, release_date } = movie;

  return (
    <Fade delay={500}>
      <TileContainer className="card movie-tile">
        {poster_path && (
          <PosterImage
            alt={`${title}-poster`}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        )}
        <ContentContainer>
          <MovieTitle>{title}</MovieTitle>
          <Overview>{overview}</Overview>
          <ReleaseDate>Release Date: {release_date}</ReleaseDate>
          <ReadMoreLink>Read more</ReadMoreLink>
        </ContentContainer>
      </TileContainer>
    </Fade>
  );
};
