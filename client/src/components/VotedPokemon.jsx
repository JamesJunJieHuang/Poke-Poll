import React, { useEffect, useState } from "react";
import VoteResultsBar from './VoteResultsBar.jsx'

const VotedPokemon = (props) => {
  let fave = false;
  if (props.pokemonImg === `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.favPokemon_id}.png`){
    fave = true;
  }
  
  return (
    <div className="VotedPokemonImgContainer">
      <img className="VotedPokemonImg" src={props.pokemonImg} />
      <VoteResultsBar
        highestVotes={props.highestVotes}
        voteQty={props.voteQty}
        fave={fave}
      />
    </div>
  );
};

export default VotedPokemon;
