import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const MovieDetailsTopBar = () => {
  return (
    <div className="top-bar-details">
      <Link to="/" className="home-link">
        <HomeIcon sx={{color : 'black'}} className="home-icon" />
      </Link>
      <div className='details-head'>Movie Details</div>
    </div>
  );
};

export default MovieDetailsTopBar;
