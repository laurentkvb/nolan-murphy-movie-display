const apiKey: string = process.env.API_MOVIE_KEY || "niks";
const baseUrl: string = "https://api.themoviedb.org/3";

interface Movie {
  title: string;
}

async function getAllMovieCredits(actorId: number): Promise<Movie[]> {
  const page: number = 1;
  let allMovieCredits: Movie[] = [];

  const response = await fetch(
    `${baseUrl}/person/${actorId}/movie_credits?api_key=${apiKey}&page=${page}`,
  );
  const data = await response.json();

  console.log(`data.cast.length(${data.cast.length})`);

  allMovieCredits = allMovieCredits.concat(data.cast).concat(data.crew);

  return allMovieCredits;
}

export async function getMoviesInvolvingActors(
  actor1Name: string,
  actor2Name: string,
): Promise<string[]> {
  try {
    console.log({ apiKey });

    // Search for Christopher Nolan
    const actor1Response = await fetch(
      `${baseUrl}/search/person?api_key=${apiKey}&query=${encodeURIComponent(actor1Name)}`,
    );
    const actor1Data = await actor1Response.json();
    const actor1Id: number = actor1Data.results[0].id;

    // Search for Cillian Murphy
    const actor2Response = await fetch(
      `${baseUrl}/search/person?api_key=${apiKey}&query=${encodeURIComponent(actor2Name)}`,
    );
    const actor2Data = await actor2Response.json();
    const actor2Id: number = actor2Data.results[0].id;

    // Get all movie credits for Christopher Nolan and Cillian Murphy
    const actor1Movies: Movie[] = await getAllMovieCredits(actor1Id);
    const actor2Movies: Movie[] = await getAllMovieCredits(actor2Id);

    // Find common movies
    const commonMovies: string[] = actor1Movies
      .filter((movie1) =>
        actor2Movies.some((movie2) => movie2.title === movie1.title),
      )
      .map((movie) => movie.title);

    return Array.from(new Set(commonMovies));
  } catch (error) {
    throw new Error(
      "Error fetching movies: " + (error as { message: string }).message,
    );
  }
}
