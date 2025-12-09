import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#4F46E5"/>
            <path d="M20 10L12 18H16V28H24V18H28L20 10Z" fill="white"/>
          </svg>
          <h1>Patient Portal</h1>
        </div>
        <p className="subtitle">Secure Medical Document Management</p>
      </div>
    </header>
  );
};

export default Header;