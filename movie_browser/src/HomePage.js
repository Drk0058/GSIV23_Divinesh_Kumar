import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=b98cd8e259390d3353384955710c4862&language=en-US&page=${page}`
      );
      const data = response.data;
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="page-content">
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
