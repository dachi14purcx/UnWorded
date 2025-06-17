const WordDisplay = ({ secretWord, guessedLetters, loading, error }) => {
  if (loading) return <div className="word-loading">Loading word...</div>;
  if (error) return <div className="word-error">Error: {error}</div>;
  
  return (
    <div className="word-display">
      {secretWord.split('').map((letter, i) => {
        const upperLetter = letter.toUpperCase();
        const isGuessed = guessedLetters.includes(upperLetter);

        return (
          <span
            key={i}
            className={`letter-box ${isGuessed ? 'bg-[#4FB145]' : 'bg-[#2D3242]'}`}
          >
            {isGuessed ? letter.toUpperCase() : ''}
          </span>
        );
      })}
    </div>
  );
};

export default WordDisplay;