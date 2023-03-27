import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";
import FavePokemonCard from "./FavePokemonCard.jsx";
import NavBar from "./NavBar.jsx";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const VotePage = (props) => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [chosenPokemonId, setChosenPokemonId] = useState(0);
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch("/api/user/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // The user has been logged out successfully
          // Redirect the user to the login page or update the UI as necessary
          navigate("/");
        } else {
          // Handle the error case
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  useEffect(() => {
    const getPokemon = () => {
      fetch("/api/getPokemon", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            // props.handleError("Please Log In With Correct Credentials To Vote");
            navigate("/"); // redirect back to login page
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setPokemonCards(data.pokemonArr.pokemonList);
            setChosenPokemonId(data.favPokemon_id);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          props.handleError(error.message);
          navigate("/"); // redirect back to login page
        });
    };

    getPokemon();
  }, []);

  return (
    <section className="VotePage">
      <NavBar
        handleLogOut={handleLogOut}
        handleResults={() => navigate("/results")}
      />
      <div
        className="FaveAndSearch"
        style={{
          height: !(pokemonCards.length && chosenPokemonId) ? "15rem" : "25rem",
        }}
      >
        <div className="FaveCardContainer">
          {(pokemonCards.length & chosenPokemonId) !== 0 && (
            <FavePokemonCard pokemonInfo={pokemonCards[chosenPokemonId - 1]} />
          )}
        </div>
        <div className="SearchBarContainer">
          <div className="SearchBar">
            <TextField
              id="search"
              label="Search Generation 1 Pokemon..."
              variant="filled"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
              margin="normal"
              sx={{
                bgcolor: "white",
                borderRadius: "8px",
                // marginLeft: "rem",
                "@media (max-width: 600px)": {
                  // Add your media query styles here
                  width: "15rem",
                  borderRadius: "8px",
                },
              }}
            />
            <Typography
              className="Instructions"
              variant="body1"
              sx={{
                color: "white",
                "@media (max-width: 600px)": {
                  // Add your media query styles here
                  marginLeft: "0rem",
                },
              }}
            >
              Click to vote on your favorite pokemon!
            </Typography>
            {(pokemonCards.length & chosenPokemonId) !== 0 && (
              <Typography
                className="ChosenPokemonText"
                variant="body1"
                sx={{
                  color: "white",
                  "@media (max-width: 600px)": {
                    // Add your media query styles here
                    marginLeft: "0rem",
                  },
                }}
              >
                <strong>
                  I choose you,{" "}
                  {pokemonCards[chosenPokemonId - 1].name
                    .charAt(0)
                    .toUpperCase() +
                    pokemonCards[chosenPokemonId - 1].name.slice(1)}
                </strong>
                !
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="CardsContainer">
        {searchQuery !== "" &&
          pokemonCards
            .filter(
              (pokemonInfo) =>
                pokemonInfo.name.toLowerCase().slice(0, searchQuery.length) ===
                searchQuery.toLowerCase()
            )
            .map((pokemonInfo, index) => {
              return (
                <PokemonCard
                  key={index}
                  pokemonInfo={pokemonInfo}
                  setChosenPokemonId={setChosenPokemonId}
                  setSearchQuery={setSearchQuery}
                />
              );
            })}
        {searchQuery === "" &&
          pokemonCards.map((pokemonInfo, index) => {
            return (
              <PokemonCard
                key={index}
                pokemonInfo={pokemonInfo}
                setChosenPokemonId={setChosenPokemonId}
                chosenPokemonId={chosenPokemonId}
                setSearchQuery={setSearchQuery}
              />
            );
          })}
      </div>
      {/* {console.log("pokemoncards: ", pokemonCards)}
      {console.log("chosenPokemonId: ", chosenPokemonId)} */}
      {/* <div>{JSON.stringify(pokemonCards)}</div> */}
    </section>
  );
};

export default VotePage;
