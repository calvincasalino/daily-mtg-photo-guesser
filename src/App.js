import './App.css';
import React, { useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { cardList } from './cardList';
import { targetCard } from './targetCard';
import cover1 from './assets/Card Covers/imageCover1.png';
import cover2 from './assets/Card Covers/imageCover2.png';
import cover3 from './assets/Card Covers/imageCover3.png';
import cover4 from './assets/Card Covers/imageCover4.png';
import cover5 from './assets/Card Covers/imageCover5.png';
import cover6 from './assets/Card Covers/imageCover6.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [guessNumber, setGuessNumber] = useState(1);
  const [boxColors, setBoxColors] = useState(Array(5).fill('white'));
  const [isCorrect, setIsCorrect] = useState(false);
  const [maxGuessesReached, setMaxGuessesReached] = useState(false);
  const [currentCover, setCurrentCover] = useState(cover1);
  const [previousCover, setPreviousCover] = useState(cover1);
  const [showInitialCover, setShowInitialCover] = useState(true);

  const coverImages = [cover1, cover2, cover3, cover4, cover5, cover6];

  const handleButtonClick = () => {
    const newBoxColors = [...boxColors];
    if (inputValue === targetCard.name) {
      newBoxColors[guessNumber - 1] = 'green';
      setIsCorrect(true);
      setBoxColors(newBoxColors);
      setPreviousCover(currentCover);
      setCurrentCover(cover6);
    } else {
      newBoxColors[guessNumber - 1] = 'red';
      setBoxColors(newBoxColors);
      if (guessNumber === 5) {
        setMaxGuessesReached(true);
        setPreviousCover(currentCover);
        setCurrentCover(cover6);
      } else {
        setPreviousCover(currentCover);
        setCurrentCover(coverImages[guessNumber]);
        setGuessNumber(prevGuessNumber => prevGuessNumber + 1);
      }
    }
    setShowInitialCover(true);
    setTimeout(() => setShowInitialCover(false), 2000);
  };

  const renderGrid = () => {
    return boxColors.map((color, index) => (
      <div key={index} className={`grid-box ${color}`}></div>
    ));
  };

  const ImageLayer = () => {
    return (
      <div className="image-container">
        {showInitialCover && <img src={previousCover} alt="Cover" className="initial-cover-image" />}
        <img src={currentCover} alt="Cover" className="cover-image" />
        <img src={targetCard.image} alt="Card" className="card-image" />
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Daily MTG Photo Guesser</h1>
 
      <ImageLayer />
    
      <div className="grid-container">
        {renderGrid()}
      </div>

      {!isCorrect && !maxGuessesReached && (
        <div className="autocomplete-container">
          <Autocomplete
            disablePortal
            id="combo-box"
            options={cardList}
            getOptionLabel={(option) => option.label}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Guess a card name" />}
            noOptionsText=""
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            filterOptions={(options, { inputValue }) => {
              if (inputValue === '') {
                return [];
              }
              return options.filter(option =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              );
            }}
          />
        </div>
      )}

      {!isCorrect && !maxGuessesReached && (
        <div className="button-container">
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleButtonClick}>
            Submit
          </Button>
        </div>
      )}

    </div>
  );
}

export default App;
