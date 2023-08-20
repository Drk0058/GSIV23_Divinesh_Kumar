import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import MovieDetails from './MovieDetails';

const mockMovieId = '884605';
const mockMovieData = {
  id: 884605,
  title: 'No Hard Feelings',
  poster_path: '/4K7gQjD19CDEPd7A9KZwr2D9Nco.jpg',
  vote_average: 7.09,
  release_date: '2023-06-15',
  runtime: 103,
  overview: 'On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.'
};

const mockCastData = {
  cast: [
    { name: 'Jennifer Lawrence' },
    { name: 'Andrew Barth Feldman' },
  ]
};

describe('MovieDetails', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    
    mock.onGet(/\/movie\/\d+/).reply(200, mockMovieData);
    mock.onGet(/\/movie\/\d+\/credits/).reply(200, mockCastData);
  });

  it('renders movie details', async () => {
    render(<MovieDetails movieId={mockMovieId} />);
    
    await waitFor(() => {
      expect(screen.getByText('No Hard Feelings')).toBeInTheDocument();
      expect(screen.getByText('7.09')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('1:43')).toBeInTheDocument();
      expect(screen.getByText('Jennifer Lawrence,Andrew Barth Feldman')).toBeInTheDocument();
      expect(screen.getByText('On the brink of losing her childhood home')).toBeInTheDocument();
    });
  });

  it('handles movie data loading', async () => {
    mock.onGet(/\/movie\/\d+/).reply(200, {});
    
    render(<MovieDetails movieId={mockMovieId} />);
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('handles movie data error', async () => {
    mock.onGet(/\/movie\/\d+/).reply(500);
    
    render(<MovieDetails movieId={mockMovieId} />);
    
    await waitFor(() => {
      expect(screen.getByText('Error fetching movie details:')).toBeInTheDocument();
    });
  });

});
