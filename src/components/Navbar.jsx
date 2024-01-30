import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='fixed top-0 left-0 z-[100] w-full'>
      <div className='flex items-center justify-between p-4'>
        <Link to='/'>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix-logo"
            className="h-8 cursor-pointer"
            style={{ marginLeft: '16px' }} 
          />
        </Link>
        {/* Add the new image on the right side */}
        <img
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.jpg"
          alt="Netflix-avatar"
          className="h-8 cursor-pointer"
          style={{ marginRight: '16px' }} 
        />
      </div>
    </div>
  );
};

export default NavBar;
