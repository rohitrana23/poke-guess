import React from 'react';
import PropTypes from 'prop-types';

function Pokedex({ pokemon, showPokedex }) {
  return (
    <div className={`pokedex ${showPokedex ? 'visible' : ''}`}>
      <h3>{pokemon.name.toUpperCase()}</h3>
      <img src={pokemon.image2} alt={pokemon.name} />
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
      <p className="description">{pokemon.description}</p>
    </div>
  );
}

Pokedex.propTypes = {
    pokemon: PropTypes.object.isRequired,
    showPokedex: PropTypes.bool.isRequired,
};

export default Pokedex;