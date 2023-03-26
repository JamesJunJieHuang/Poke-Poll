import React from "react";
import masterball from '../assets/masterball.png'

const FavePokemonCard = (props) => {
  return (
    <div
      className="FavePokemonCard"
      style={{
        backgroundColor: `var(--${props.pokemonInfo.type[0].type.name})`,
      }}
    >
      <div className="FavePokeCardHeader">
        <h2 id="FavePokeCardName">
          {props.pokemonInfo.name[0].toUpperCase() +
            props.pokemonInfo.name.slice(1)}
        </h2>
        <h2 id='FavePokeCardHP'>{props.pokemonInfo.stats[0].base_stat} HP</h2>
      </div>
      <img className='FavePokemonImage'
        src={props.pokemonInfo.image}
        style={{
          backgroundColor: `var(--${props.pokemonInfo.type[0].type.name}2)`,
        }}
      />
      <div className='FavePokeballDiv'>
        <img src={masterball} alt="Image" className="FavePokeball" />
      </div>
    </div>
  );
};

export default FavePokemonCard;
