import { useState, useEffect } from "react";
import Starter from "./components/starterpage/Starter";
import Header from "./components/header/Header";
import Game from "./components/games/Game";
import Tournament from "./components/tournament/Tournament";
import { Routes, Route, useLocation } from 'react-router-dom';
import TourGame from "./components/games/tourGame";

function App() {
  const [theme, setTheme] = useState(true);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('score');
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? 0 : parsed;
  });
  const [tourScore, setTourScore] = useState(0)
  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  useEffect(() => {
    document.body.className = `duration-800 ${theme ? 'bg-[#262B3C] text-white' : 'bg-white text-[#1A1A1A]'}`;
  }, [theme]);

  const location = useLocation();

  const hideHeaderPaths = ['/game', '/tournament', '/starter', '/tourGame'];
  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} score={score} history={history}/>

      {!hideHeader && <Starter theme={theme}/>}

      <Routes>
        <Route path="/starter" element={<Starter />} /> 
        <Route path="/tournament" element={<Tournament tourScore={tourScore}/>} />
        <Route path="/game" element={<Game setScore={setScore} score={score} setHistory={setHistory}/>} /> 
        <Route path="/tourGame" element={<TourGame setScore={setScore} setTourScore={setTourScore} tourScore={tourScore}/>}/>
      </Routes>
    </div>
  );
}

export default App;
