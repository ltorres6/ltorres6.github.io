import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1);
    const pageTitle = path
      ? path.charAt(0).toUpperCase() + path.slice(1)
      : 'Home';
    document.title = `Luis Torres, PhD${
      pageTitle !== 'Home' ? ` - ${pageTitle}` : ''
    }`;
  }, [location]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/education">Education</Link>
          </li>
          <li>
            <Link to="/developer">Developer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
