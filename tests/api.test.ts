import { getAllMovieCredits, getMoviesInvolvingActors } from "../src/api";

// Mocking fetch function
const mockFetch = jest.fn();

// eslint-disable-next-line
(global as any).fetch = mockFetch;

afterEach(() => {
  mockFetch.mockReset();
});

describe("getAllMovieCredits function", () => {
  // Mocking fetch function
  mockFetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({
      cast: [
        { id: 1, title: "Movie A" },
        { id: 2, title: "Movie B" },
      ],
      crew: [
        { id: 3, title: "Movie C" },
        { id: 4, title: "Movie D" },
      ],
    }),
  });

  it("fetches movie credits correctly", async () => {
    const actorId = 123; // Example actor ID
    const result = await getAllMovieCredits(actorId);

    expect(result).toHaveLength(4); // Assuming 2 cast and 2 crew members are returned
    expect(result[0]).toEqual({ id: 1, title: "Movie A" });
    expect(result[1]).toEqual({ id: 2, title: "Movie B" });
    expect(result[2]).toEqual({ id: 3, title: "Movie C" });
    expect(result[3]).toEqual({ id: 4, title: "Movie D" });
  });
});

describe("getMoviesInvolvingActors function", () => {
  it("returns common movies involving actors", async () => {
    const actor1Name = "Christopher Nolan";
    const actor2Name = "Cillian Murphy";

    // Mock responses for actor searches
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [{ id: 1 }], // Mocking actor ID for Christopher Nolan
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [{ id: 2 }], // Mocking actor ID for Cillian Murphy
      }),
    });

    // Mock responses for movie credits
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        cast: [{ title: "Movie 1" }, { title: "Movie 2" }], // Mocking movies for Christopher Nolan
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        cast: [{ title: "Movie 1" }, { title: "Movie 3" }], // Mocking movies for Cillian Murphy, including one common movie
      }),
    });

    const movies = await getMoviesInvolvingActors(actor1Name, actor2Name);

    expect(movies.length).toBe(1);
    expect(movies[0].title).toBe("Movie 1");
  });

  it("should handle network failures", async () => {
    const actor1Name = "Christopher Nolan";
    const actor2Name = "Cillian Murphy";

    // Mocking network failure for actor searches
    mockFetch.mockRejectedValueOnce("Network error");

    // No need to mock movie credits as it won't be called due to network error

    await expect(
      getMoviesInvolvingActors(actor1Name, actor2Name),
    ).rejects.toThrowError("Error fetching movies: Network error");
  });

  it("should handle non-existing actors", async () => {
    const actor1Name = "Nonexistent Actor 1";
    const actor2Name = "Nonexistent Actor 2";

    // Mock responses for actor searches
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [], // Empty array for Nonexistent Actor 1
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [], // Empty array for Nonexistent Actor 2
      }),
    });

    // No need to mock movie credits as it won't be called due to actors not found
    await expect(
      getMoviesInvolvingActors(actor1Name, actor2Name),
    ).rejects.toThrowError();
  });

  it("should not return common movies involving actors", async () => {
    const actor1Name = "Christopher Nolan";
    const actor2Name = "Tom Cruise";

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [{ id: 1 }], // Mocking actor ID for Christopher Nolan
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [{ id: 2 }], // Mocking actor ID for Cillian Murphy
      }),
    });

    // Mock responses for movie credits
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        cast: [{ title: "Movie 1" }, { title: "Movie 2" }], // Mocking movies for Christopher Nolan
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        cast: [{ title: "Movie 3" }, { title: "Movie 4" }], // Mocking movies for Cillian Murphy
      }),
    });

    const movies = await getMoviesInvolvingActors(actor1Name, actor2Name);
    expect(movies.length).toBe(0);
  });
});
