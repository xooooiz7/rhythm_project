import React from 'react'
import './OptionButton.css'

function OptionButton() {
  return (
    <div className="button-container">
        <div className="icon-back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
        </div>
        <button className="search-song-button"><p>ค้นหาเพลงอื่น</p></button>
        <button className="overview-button"><p>ภาพรวม</p></button>
        <button className="guitartuner-button"><p>ตั้งสายกีตาร์</p></button>
    </div>
  )
}

export default OptionButton