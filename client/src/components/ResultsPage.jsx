import React, { useEffect, useState } from "react";
import styles from "../scss/application.scss";
import pokePollBanner from "../assets/PokePollBanner.png";
import { Link, useNavigate } from "react-router-dom";
import VotedPokemon from './VotedPokemon.jsx';



const ResultsPage = (props) => {
  const [pollResultsArr, setPollResultsArr] = useState([]);
  const [highestVotes, setHighestVotes] = useState(0);

  useEffect(() => {
    //fetch results from server -> database
    fetch("/api/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((resultsObj) => {
        const resultsArr = [];
        for (const [key, value] of Object.entries(resultsObj)) {
          resultsArr.push([
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${key}.png`,
            value,
          ]);
        }
        //filter results to only contain pokemon with votes
        const filteredResults = resultsArr.filter((el) => {
          return (
            el[1] !== 0 &&
            el[0] !==
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
          );
        });
        //sort filtered results to have pokemon that have more votes be first
        filteredResults.sort(function (a, b) {
          return b[1] - a[1];
        });
        //console.log(filteredResults);
        setPollResultsArr(filteredResults);
        setHighestVotes(filteredResults[0][1]);
      })
      .catch((error) => {
        console.error("Error:", error);
        // props.handleError(error.message);
        // navigate("/"); // redirect back to login page
      });
  }, []);

  return (
    <section className="ResultsPage">
      <div className="Banner">
        <Link to="/Vote">
        <img className="ResultsPokePollImage" src={pokePollBanner} />
        </Link>
      </div>
      <div className="ResultsContainer">
        {pollResultsArr.map((el) => {
          return <VotedPokemon pokemonImg={el[0]} voteQty={el[1]} highestVotes={highestVotes}/>;
        })}
      </div>
    </section>
  );
};

export default ResultsPage;
