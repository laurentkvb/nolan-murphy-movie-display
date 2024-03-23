import { renderHook } from "@testing-library/react-hooks";
import * as api from "../src/api/api";
import { useMoviesInvolvingActors } from "../src/hooks/useMoviesInvolvingActors";

jest.mock("../src/api/api");

describe("useMoviesInvolvingActors", () => {
  it("fetches and stores movies correctly", async () => {
    const actor1Name = "Christopher Nolan";
    const actor2Name = "Cillian Murphy";
    const mockMovies = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
    ];

    // Mocking the API function
    (api.getMoviesInvolvingActors as jest.Mock).mockResolvedValue(mockMovies); // Access the mock function via the imported module

    const { result, waitForNextUpdate } = renderHook(() =>
      useMoviesInvolvingActors(actor1Name, actor2Name),
    );

    // Assert initial fetchState
    expect(result.current.fetchState).toBe("fetching");

    await waitForNextUpdate();

    // Assert final fetchState
    expect(result.current.fetchState).toBe("idle");

    // Assert movies are fetched and stored correctly
    expect(result.current.movies).toEqual(mockMovies);
  });

  it("initial fetchState is fetching - due actors are being passed as arguments", () => {
    const actor1Name = "Christopher Nolan";
    const actor2Name = "Cillian Murphy";

    // Mocking the API function
    (api.getMoviesInvolvingActors as jest.Mock).mockResolvedValue([]); // Access the mock function via the imported module

    const { result } = renderHook(() =>
      useMoviesInvolvingActors(actor1Name, actor2Name),
    );

    // Assert initial fetchState is idle
    expect(result.current.fetchState).toBe("fetching");
  });
});
