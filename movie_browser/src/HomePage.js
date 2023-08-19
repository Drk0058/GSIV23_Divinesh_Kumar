import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery, searching]);

  const fetchMovies = async () => {
    try {
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=b98cd8e259390d3353384955710c4862&language=en-US&page=${page}`;

      if (searchQuery && searching) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=b98cd8e259390d3353384955710c4862&language=en-US&page=${page}&query=${searchQuery}`;
      }

      const response = await axios.get(apiUrl);
      const data = response.data;
      if (page === 1 || searching) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]); 
    setPage(1); 
    setSearching(true); 
  };

  return (
    <div className="page-content">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage(page + 1)}
        hasMore={page < totalPages}
        loader={<h4>Loading...</h4>}
      >
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-thumbnail"
              />
              <h3>{movie.title}</h3>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
