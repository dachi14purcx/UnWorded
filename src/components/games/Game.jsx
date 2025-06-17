import { useState, useEffect } from 'react';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import words from '../../assets/additional things/words';
// import Ellipse from '../../../imgs/Ellipse 1.svg';
// import Group20 from '../../../imgs/Group 20.svg';
// import Rectangle37 from '../../../imgs/Rectangle 37.svg';
// import Rectangle38 from '../../../imgs/Rectangle 38.svg';
// import Rectangle39 from '../../../imgs/Rectangle 39.svg';
// import Rectangle40 from '../../../imgs/Rectangle 40.svg';

const Game = ({setScore, score, setHistory}) => {
  const [secretWord, setSecretWord] = useState('');
  const [category, setCategory] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);

  const wordBank = words;

  useEffect(() => {
    startNewGame();
  }, []);

  const calculateScore = (mistakes) => {
    const scoreTable = [250, 200, 150, 100, 50, 0];
    return scoreTable[mistakes] ?? 0;
  };

  const startNewGame = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const randomWordData = wordBank[Math.floor(Math.random() * wordBank.length)];
        setSecretWord(randomWordData.word.toLowerCase());
        setCategory(randomWordData.category);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameStatus('playing');
        setHintUsed(false);
        setLoading(false);
      } catch (err) {
        setError("Error starting game");
        setLoading(false);
      }
    }, 500);
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter.toUpperCase())) return;

    const upperLetter = letter.toUpperCase();
    const newGuessedLetters = [...guessedLetters, upperLetter];
    setGuessedLetters(newGuessedLetters);

    if (!secretWord.toUpperCase().includes(upperLetter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= 5) {
        setGameStatus('lost');
      }
    } else {
      const hasWon = [...secretWord.toUpperCase()].every(l => newGuessedLetters.includes(l));
      if (hasWon) {
        setGameStatus('won');
        const gained = calculateScore(wrongGuesses);
        setScore(prev => prev + gained);
        setHistory(prev => [...prev, {
          word: secretWord,
          category: category,
          attempts: newGuessedLetters.length,
          date: new Date().toLocaleString()
        }])
      }
    }
  };

  const useHint = () => {
    if (hintUsed || gameStatus !== 'playing' || score < 10) return;

    setHintUsed(true);
    setScore(prev => prev - 10);
  };

  return (
    <div className="game-container">
      
      {/* <div className='absolute left-0'>
        <img src={Group20} alt="" />
        <img src={Ellipse} alt="Ellipse" className={`absolute transition-opacity duration-500 ${wrongGuesses >= 1 ? 'opacity-100' : 'opacity-0'}`} />
        <img src={Rectangle37} alt="Rectangle 37" className={`absolute transition-opacity duration-500 ${wrongGuesses >= 2 ? 'opacity-100' : 'opacity-0'}`} />
        <img src={Rectangle40} alt="Rectangle 40" className={`absolute transition-opacity duration-500 ${wrongGuesses >= 3 ? 'opacity-100' : 'opacity-0'}`} />
        <img src={Rectangle39} alt="Rectangle 39" className={`absolute transition-opacity duration-500 ${wrongGuesses >= 4 ? 'opacity-100' : 'opacity-0'}`} />
        <img src={Rectangle38} alt="Rectangle 38" className={`absolute transition-opacity duration-500 ${wrongGuesses >= 5 ? 'opacity-100' : 'opacity-0'}`} />
      </div> */}

      <WordDisplay
        secretWord={secretWord}
        guessedLetters={guessedLetters}
        loading={loading}
        error={error}
      />
      
      <div className="game-header">
        <div className="lives-hint font-semibold text-4xl">
          Lives: {Array(5 - wrongGuesses).fill('❤️').map((heart, i) => (
            <span key={i}>{heart}</span>
          ))}
          
          <div className='ml-10 flex gap-2 items-center'>
            <p className='text-3xl font-semibold'>Hint 10pts:</p>
            <button onClick={useHint} disabled={hintUsed || gameStatus !== 'playing' || score < 10} className="hint-button">
              💡
            </button>
          </div>
        </div>
      </div>

      <div className="game-status flex flex-col items-center">
        {gameStatus === 'won' && (
          <span className="won-message">
            You won! +{calculateScore(wrongGuesses)} points
          </span>
        )}
        {gameStatus === 'lost' && (
          <span className="lost-message">You lost! The word was: {secretWord}</span>
        )}
      

      {(gameStatus === 'won' || gameStatus === 'lost' || error) && (
        <button onClick={startNewGame} className="play-again-button">
          {error ? 'Try Again' : 'Play Again'}
        </button>
      )}
      </div>

      {hintUsed && (
        <div className="hint-display">
          Category: {category}
        </div>
      )}

      <Keyboard
        handleLetterClick={handleLetterClick}
        guessedLetters={guessedLetters}
        secretWord={secretWord}
        gameStatus={gameStatus}
        loading={loading}
      />
    </div>
  );
};

export default Game;