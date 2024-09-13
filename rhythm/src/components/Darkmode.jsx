import React from 'react';
import './Darkmode.css';

function Darkmode({ isDarkMode, onToggle }) {
  return (
    <div className='box-mode'>
      <input 
        type="checkbox" 
        className='checkbox' 
        checked={isDarkMode}
        onChange={onToggle} 
      />
    </div>
  );
}

export default Darkmode;
