import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import HomePage from './HomePage';

const mockMovies = {
  results: [
    { id: 976573, title: 'Elemental', poster_path: '/6oH378KUfCEitzJkm07r97L0RsZ.jpg', vote_average: 7.7, overview: 'In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.' },
    { id: 724209, title: 'Heart of Stone', poster_path: '/xVMtv55caCEvBaV83DofmuZybmI.jpg', vote_average: 7, overview: 'An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing its most valuable — and dangerous — weapon.' },
  ],
  total_pages: 3,
};

describe('HomePage', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(/\/discover\/movie/).reply(200, mockMovies);
    mock.onGet(/\/search\/movie/).reply(200, mockMovies);
  });

  it('renders initial movie grid', async () => {
    render(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Elemental')).toBeInTheDocument();
      expect(screen.getByText('Heart of Stone')).toBeInTheDocument();
    });
  });

  it('handles loading state when fetching movies', async () => {
    mock.onGet(/\/discover\/movie/).reply(200, {});
    render(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('handles error state when fetching movies', async () => {
    mock.onGet(/\/discover\/movie/).reply(500);
    render(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Error fetching movies:')).toBeInTheDocument();
    });
  });

  it('updates movie grid on search', async () => {
    render(<HomePage />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    searchInput.value = 'Test';
    searchButton.click();
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('The Beta Test')).toBeInTheDocument();
    });
  });

});
