import React, { useState } from "react";
import pokemonAudio from "../assets/pokemonChosen.mp3";
import pokeball from '../assets/pokeball.png'

const PokemonCard = (props) => {
  const [audio] = useState(new Audio(pokemonAudio));

  const choosePokemon = () => {
    audio.volume = 0.4;
    audio.play();
    //choose favorite pokemon
    props.setSearchQuery('');
    props.setChosenPokemonId(props.pokemonInfo.id);
    fetch("/api/getPokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favPokemon_id: props.pokemonInfo.id,
      }),
    })
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div
      className="PokemonCard"
      onClick={choosePokemon}
      style={{
        backgroundColor: `var(--${props.pokemonInfo.type[0].type.name})`,
      }}
    >
      <div className="PokeCardHeader">
        <h2 id="pokeCardName">
          {props.pokemonInfo.name[0].toUpperCase() +
            props.pokemonInfo.name.slice(1)}
        </h2>
        <h2>{props.pokemonInfo.stats[0].base_stat} HP</h2>
      </div>
      <img className='PokemonImage'
        src={props.pokemonInfo.image}
        style={{
          backgroundColor: `var(--${props.pokemonInfo.type[0].type.name}2)`,
        }}
      />
      <div className='PokeballDiv'>
        <img src={pokeball} alt="Image" className="Pokeball" />
      </div>
    </div>
  );
};

export default PokemonCard;
