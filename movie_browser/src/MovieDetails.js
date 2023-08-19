import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieDetailsTopBar from './MovieDetailsTopBar';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState('');
  const [runtime, setRuntime] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=b98cd8e259390d3353384955710c4862&language=en-US`
      );
      const castResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b98cd8e259390d3353384955710c4862`
      );

      const movieData = movieResponse.data;
      const castData = castResponse.data.cast.slice(0, 5); // Get the first 5 cast members

      setMovie(movieData);
      setCast(castData);
      setDirector(getDirector(movieData.credits.crew));
      setRuntime(movieData.runtime);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const getDirector = (crew) => {
    const director = crew.find(member => member.job === 'Director');
    return director ? director.name : '';
  };
  if (!movie) {
    return (
      <div className="page-content">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="page-content">
      <MovieDetailsTopBar />
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className='movie-info-compolete'>
          <div className='movie-title-details'><span>{movie.title} </span>
          <div className='movie-rating-details'>({movie.vote_average})</div>
          </div>
          <div className='movie-yld'>{movie.release_date.split('-')[0]} | {runtime} minutes | Director: {director}</div>
          <div className='movie-cast'>Cast: {cast[0].name},{cast.length > 1 ? cast[1].name : ''}{cast.length > 2 ? ',...' : ''}</div>
          <div className='movie-description'>Description: {movie.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
