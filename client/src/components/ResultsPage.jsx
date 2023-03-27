import React, { useEffect, useState } from "react";
import pokePollBanner from "../assets/PokePollBanner.png";
import { Link } from "react-router-dom";
import VotedPokemon from "./VotedPokemon.jsx";

const ResultsPage = (props) => {
  const [pollResultsArr, setPollResultsArr] = useState([]);
  const [highestVotes, setHighestVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [favPokemon_id, setFavPokemon_id] = useState(0);

  useEffect(() => {
    //fetch results from server -> database
    //console.log('hit resultsPage')
    fetch("/api/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //console.log('result page /api/results get response: ', response)
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((resultsObj) => {
        //console.log("resultsobj: ", resultsObj);
        const resultsArr = [];
        let sumvotes = 0;
        setFavPokemon_id(resultsObj.favPokemon_id);
        for (const [key, value] of Object.entries(resultsObj.result)) {
          resultsArr.push([
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${key}.png`,
            value,
          ]);
          sumvotes += value;
        }
        setTotalVotes(sumvotes);
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
        //console.log("filteredResults: ", filteredResults);
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
      {pollResultsArr.length !== 0 && (
        <>
          <div className="ResultsContainer">
            {pollResultsArr.map((el, index) => {
              return (
                <VotedPokemon
                  favPokemon_id={favPokemon_id}
                  key={index}
                  pokemonImg={el[0]}
                  voteQty={el[1]}
                  highestVotes={highestVotes}
                  totalVotes={totalVotes}
                />
              );
            })}
          </div>
          <h2 className="TotalVotes">{`${totalVotes} Votes`}</h2>
        </>
      )}
    </section>
  );
};

export default ResultsPage;
