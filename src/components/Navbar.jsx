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
          src="https://i.pinimg.com/474x/44/78/1b/44781ba4ac0c63f2ecf0793a533bf8dc.jpg"
          alt="Netflix-avatar"
          className="h-8 cursor-pointer"
          style={{ marginRight: '16px' }} 
        />
      </div>
    </div>
  );
};

export default NavBar;
