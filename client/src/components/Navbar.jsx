
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.scss'

const Navbar = () => {

  return (
    <nav>
      <div className="nav-content">
        <ul>

          <li><Link to="/">Home</Link></li>
          <li><Link to="/imageGallery2">Image-Gallery</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
