import { useEffect, useState } from "react";
import { Movie } from "../types/types.ts";
import { getMoviesInvolvingActors, hasMessageField } from "../api/api.ts";

export const useMoviesInvolvingActors = (
  actor1Name: string,
  actor2Name: string,
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [fetchState, setFetchState] = useState<"fetching" | "idle">("idle");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setFetchState("fetching");
        const movies = await getMoviesInvolvingActors(actor1Name, actor2Name);

        setMovies(movies);
        setFetchState("idle");
      } catch (error) {
        console.error(error);
        let errMsg = "";

        if (typeof error === "string") {
          errMsg = error;
        }

        if (hasMessageField(error) && error.message) {
          errMsg = error.message;
        }

        throw new Error(`Error fetching movies: ${errMsg}`);
      }
    };

    fetchMovies();
  }, [actor1Name, actor2Name]);

  return { movies, fetchState };
};
