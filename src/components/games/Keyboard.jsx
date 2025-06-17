const Keyboard = ({ handleLetterClick, guessedLetters, secretWord, gameStatus, loading }) => {
  const keyboardRows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  return (
    <div className="keyboard drop-shadow-2xl">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map(letter => {
            const upperLetter = letter.toUpperCase();
            const isGuessed = guessedLetters.includes(upperLetter);
            const isCorrect = secretWord.toUpperCase().includes(upperLetter);

            return (
              <button
                key={upperLetter}
                onClick={() => handleLetterClick(upperLetter)}
                disabled={isGuessed || gameStatus !== 'playing' || loading}
                className={`keyboard-key ${
                  isGuessed ? (isCorrect ? 'correct' : 'wrong') : ''
                } shadow-2xl`}
              >
                {upperLetter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;