import { MessageObject, Movie } from "./types/types.ts";

const apiKey: string = process.env.API_MOVIE_KEY || "err";
const baseUrl: string = "https://api.themoviedb.org/3";

export const hasMessageField = (obj: unknown): obj is MessageObject =>
  typeof obj === "object" &&
  obj !== null &&
  "message" in obj &&
  typeof obj.message === "string";

export async function getAllMovieCredits(actorId: number): Promise<Movie[]> {
  const page: number = 1;
  let allMovieCredits: Movie[] = [];

  const response = await fetch(
    `${baseUrl}/person/${actorId}/movie_credits?api_key=${apiKey}&page=${page}`,
  );
  const data = await response.json();

  allMovieCredits = allMovieCredits.concat(data.cast).concat(data.crew);

  return allMovieCredits.filter((movie): movie is Movie => movie !== undefined);
}

export async function getMoviesInvolvingActors(
  actor1Name: string,
  actor2Name: string,
): Promise<Movie[]> {
  try {
    // Search for Christopher Nolan
    const nolanResponse = await fetch(
      `${baseUrl}/search/person?api_key=${apiKey}&query=${encodeURIComponent(actor1Name)}`,
    );
    const nolanData = await nolanResponse.json();
    const nolanId: number = nolanData.results[0].id;

    // Search for Cillian Murphy
    const murphyResponse = await fetch(
      `${baseUrl}/search/person?api_key=${apiKey}&query=${encodeURIComponent(actor2Name)}`,
    );
    const murphyData = await murphyResponse.json();
    const murphy2Id: number = murphyData.results[0].id;

    // Get all movie credits for Christopher Nolan and Cillian Murphy
    const nolanMovies = getAllMovieCredits(nolanId);
    const murphyMovies = getAllMovieCredits(murphy2Id);
    const promises = await Promise.all([nolanMovies, murphyMovies]);

    const [allNolanMovies, allMurphyMovies] = promises;

    const commonMovies = allNolanMovies.filter((movie1) =>
      allMurphyMovies.some((movie2) => movie2.title === movie1.title),
    );

    return Array.from(new Set(commonMovies.map((movie) => movie.id)))
      .map((id) => commonMovies.find((movie) => movie.id === id))
      .filter((movie): movie is Movie => movie !== undefined);
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
}
