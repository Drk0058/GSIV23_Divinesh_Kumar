import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
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
      setRuntime(movieData.runtime);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
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
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p>Rating: {movie.vote_average}</p>
        <p>Runtime: {runtime} minutes</p>
        <h3>Cast:</h3>
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
