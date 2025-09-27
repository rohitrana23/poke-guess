import React from 'react';
import PropTypes from 'prop-types';

function Card({ 
  pokemon, 
  guess, 
  setGuess, 
  handleGuess, 
  fetchNewPokemon, 
  message, 
  isCorrect, 
  setShowPokedex, 
  showPokedex 
}) {
  return (
    <div className="card">
      <h2>Guess The Pokémon</h2>
      <img
        src={pokemon.image}
        alt="Hidden Pokémon"
        className={`pokemon-image ${isCorrect ? 'revealed' : ''}`}
      />
      <br />
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter Pokémon name"
        disabled={isCorrect}
      />
      <div className="button-group">
        <button onClick={handleGuess} disabled={isCorrect}>
          Guess
        </button>
        <button onClick={fetchNewPokemon}>
          New Pokémon
        </button>
      </div>

      {isCorrect && (
        <button className="pokedex-btn" onClick={() => setShowPokedex(!showPokedex)}>
          {showPokedex ? 'Hide Pokédex' : 'Show Pokédex'}
        </button>
      )}
      
      <div className="message">{message}</div>
    </div>
  );
}


export default Card;