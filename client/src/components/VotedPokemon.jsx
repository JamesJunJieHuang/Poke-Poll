import React, { useEffect, useState } from "react";
import VoteResultsBar from './VoteResultsBar.jsx'

const VotedPokemon = (props) => {

  console.log(props.pokemonImg)
  return (
    <div className="VotedPokemonImgContainer">
        <img
          className="VotedPokemonImg"
          src={props.pokemonImg}
        />
        <VoteResultsBar highestVotes={props.highestVotes} voteQty={props.voteQty}/>
    </div>
  );
};

export default VotedPokemon;
