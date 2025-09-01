let currentPokemon = "";
async function newPokemon() {
    document.getElementById("message").textContent = "";
    const poke = Math.floor(Math.random() * 152);
    const abc = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    const data = await abc.json();
    currentPokemon = data.name;
    const img = document.getElementById("Img");
    img.src = data.sprites.other["showdown"].front_default;
    img.classList.remove("revealed");
    document.getElementById("guessInput").value = "";
}

function checkGuess() {
    const guess = document.getElementById("guessInput").value.toLowerCase();
    const msg = document.getElementById("message");
    const img = document.getElementById("Img");

    if (guess === currentPokemon.toLowerCase()) {
        msg.textContent = `Correct! It's ${currentPokemon}!`;
        img.classList.add("revealed");
    } else {
        msg.textContent = "Wrong guess";
    }
}
newPokemon();
