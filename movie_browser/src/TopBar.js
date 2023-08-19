import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="home-link">
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
