import React from 'react';
import './navbar.css';
import Darkmode from './Darkmode';

function Navbar({ isDarkMode, onDarkModeToggle }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item dropdown">
          <div className="dropdown-item">
            <button className="dropbtn">ฟังก์ชันทั้งหมด</button>
            <div className="dropdown-content">
              <a href="#option1">หาจังหวะคอร์ด</a>
              <a href="#option2">ตั้งสายกีตาร์</a>
            </div>
            <div className="icon-dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a href="#aboutme">เกี่ยวกับเรา</a>
        </li>
        <li className="nav-item">
          <button onClick={onDarkModeToggle}>
            <Darkmode isDarkMode={isDarkMode} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
