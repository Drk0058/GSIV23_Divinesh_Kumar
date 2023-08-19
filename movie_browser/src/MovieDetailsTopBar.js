import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
const MovieDetailsTopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/" className="home-link">
        <HomeIcon className="home-icon" />
      </Link>
    </div>
  );
};

export default MovieDetailsTopBar;
