import './App.css';
import React, { useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { cardList } from './cardList'
import { targetCard } from './targetCard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [guessNumber, setGuessNumber] = useState(1);
  const [currentImage, setCurrentImage] = useState(targetCard.image1);
  const [boxColors, setBoxColors] = useState(Array(5).fill('white'));
  const [isCorrect, setIsCorrect] = useState(false);
  const [maxGuessesReached, setMaxGuessesReached] = useState(false);

  const handleButtonClick = () => {
    const newBoxColors = [...boxColors];
    if (inputValue === targetCard.name) {
      newBoxColors[guessNumber - 1] = 'green';
      setIsCorrect(true);
      setCurrentImage(targetCard.image6);
      setBoxColors(newBoxColors);
      //alert('Correct! You guessed the right card.');
    } else {
      newBoxColors[guessNumber - 1] = 'red';
      setBoxColors(newBoxColors);
      //alert('Incorrect. Try again!');
      if (guessNumber === 5) {
        setMaxGuessesReached(true);
        setCurrentImage(targetCard.image6);
      } else {
        setGuessNumber(prevGuessNumber => {
          const newGuessNumber = prevGuessNumber + 1;
          setCurrentImage(targetCard[`image${newGuessNumber}`]);
          return newGuessNumber;
        });
      }
    }
  };

  const renderGrid = () => {
    return boxColors.map((color, index) => (
      <div key={index} className={`grid-box ${color}`}></div>
    ));
  };

  return (
    <div className="App">
      <h1>Daily MTG Photo Guesser</h1>
 
      <img src={currentImage} alt='Card' style={{ width: 'auto', height: '600px' }} />
      
      <div className="grid-container">
        {renderGrid()}
      </div>

      {!isCorrect && !maxGuessesReached && (<div className="autocomplete-container">
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
      </div>)}

      {!isCorrect && !maxGuessesReached && (<div className="button-container">
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleButtonClick}>
          Submit
        </Button>
      </div>)}

    </div>
  );
}


export default App;


