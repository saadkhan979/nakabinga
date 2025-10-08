import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './appLayout.css';

const UserLayout = ({ disableSidebar = false, redirectPath = null }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      return navigate(redirectPath);
    }
  }, [redirectPath]);

  return (
    <div>
      {/* <div className="header">
        <div className="header-left">
          <div className="header-left-logo">
            <h1>Logo</h1>
          </div>
          <div className="header-left-menu">
            <ul>
              <li>Home</li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="appContainer">
        <Outlet />
      </div>
      <div className="footer">
        <div className="footer-left">
          <h1>Footer</h1>
        </div>
      </div> */}
    </div>
  );
};

export default UserLayout;
