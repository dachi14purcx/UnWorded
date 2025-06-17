import React from 'react'
import { MdHistory } from "react-icons/md";
import { useState } from 'react';

const History = ({history}) => {
  const [showHistory, setShowHistory] = useState(false);
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };


  return (
    <div>
      <div onClick={toggleHistory} className='flex gap-[0.5vw] text-[1.7vw] font-semibold items-center cursor-pointer mr-[5vw]'><MdHistory className='text-[2vw]'/>History</div>
      {showHistory && (
          <div className="history-panel absolute">
            <h3>Game History</h3>
            {history.length === 0 ? (
              <p>No games played yet.</p>
            ) : (
              <ul>
                {history.map((game, index) => (
                  <li key={index} className="history-item">
                    <div className="history-word">{game.word}</div>
                    <div className="history-details">
                      <span>Date: {game.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
    </div>
  )
}

export default History