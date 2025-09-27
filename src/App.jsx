import { useState, useEffect } from 'react';
import './index.css';
import Card from './components/Card.jsx'; 
import Pokedex from './components/Pokedex.jsx'; 

const POPULAR_POKEMON_IDS = [
  1,   // Bulbasaur
  3,   // Venusaur
  4,   // Charmander
  6,   // Charizard
  7,   // Squirtle
  9,   // Blastoise
  25,  // Pikachu
  52,  // Meowth
  94,  // Gengar 
  129, // Magikarp
  130, // Gyarados
  143, // Snorlax
  150, // Mewtwo
  151  // Mew
];

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showPokedex, setShowPokedex] = useState(false);

  const fetchNewPokemon = async () => {
    setMessage('');
    setGuess('');
    setIsCorrect(false);
    setShowPokedex(false);

    const randomIndex = Math.floor(Math.random() * POPULAR_POKEMON_IDS.length);
    const randomId = POPULAR_POKEMON_IDS[randomIndex];
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      
      const flavorTextEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );
      const description = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, ' ') : "No description available.";

      setPokemon({
        name: data.name,
        image: data.sprites.other["dream_world"].front_default,
        image2:data.sprites.other["showdown"].front_default, 
        height: data.height,
        weight: data.weight,
        description: description,
      });

    } catch (error) {
      setMessage('Failed to fetch Pokémon. Please try again.');
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchNewPokemon();
  }, []);

  const handleGuess = () => {
    if (!guess || !pokemon) return;

    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setMessage(`Correct! It's ${pokemon.name.toUpperCase()}!`);
      setIsCorrect(true);
    } else {
      setMessage('Wrong guess, try again!');
    }
  };

  if (!pokemon) {
    return <div>Loading Pokémon...</div>;
  }
  
  return (
    <div className="app-container">
      <Card
        pokemon={pokemon}
        guess={guess}
        setGuess={setGuess}
        handleGuess={handleGuess}
        fetchNewPokemon={fetchNewPokemon}
        message={message}
        isCorrect={isCorrect}
        setShowPokedex={setShowPokedex}
        showPokedex={showPokedex}
      />

      <Pokedex 
        pokemon={pokemon} 
        showPokedex={showPokedex} 
      />
    </div>
  );
}

export default App;