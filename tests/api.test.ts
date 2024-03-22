import { getAllMovieCredits } from '../src/api';


// Mocking fetch function
global.fetch = (jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        cast: [{ id: 1, title: 'Movie A' }, { id: 2, title: 'Movie B' }],
        crew: [{ id: 3, title: 'Movie C' }, { id: 4, title: 'Movie D' }]
      }),
    })
) as jest.Mock);

describe('getAllMovieCredits function', () => {
  it('fetches movie credits correctly', async () => {
    const actorId = 123; // Example actor ID
    const result = await getAllMovieCredits(actorId);

    expect(result).toHaveLength(4); // Assuming 2 cast and 2 crew members are returned
    expect(result[0]).toEqual({ id: 1, title: 'Movie A' });
    expect(result[1]).toEqual({ id: 2, title: 'Movie B' });
    expect(result[2]).toEqual({ id: 3, title: 'Movie C' });
    expect(result[3]).toEqual({ id: 4, title: 'Movie D' });
  });

});
