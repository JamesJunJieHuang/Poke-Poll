import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import pokeball from "../assets/pokeball.png";

export default function VoteResultsBar(props) {
  return (
    <div className="ResultBarContainer">
      {!props.fave && (
        <Card
          className="ResultBar"
          sx={{
            width: `${(props.voteQty / props.highestVotes) * 100}%`,
            height: "3rem",
            display: "flex", 
            alignItems: "center", 
            backgroundColor: "#4dabf5", 
            color: "white", 
          }}
        >
          <CardContent className="ResultBarContent">
            <Typography className="ResultBarText" fontSize="1rem">
              {`${((props.voteQty / props.totalVotes) * 100).toFixed(1)}%`}
            </Typography>
            <div className="PokeballDiv">
              <img src={pokeball} alt="Image" className="ResultPokeball" />
            </div>
          </CardContent>
        </Card>
      )}
      {props.fave && (
        <Card
          className="ResultBar"
          sx={{
            width: `${(props.voteQty / props.highestVotes) * 100}%`,
            height: "3rem",
            display: "flex", 
            alignItems: "center", 
            backgroundColor: "#FD6F51", 
            color: "white", 
          }}
        >
          <CardContent className="ResultBarContent">
            <Typography className="ResultBarText" fontSize="1rem">
              {`${((props.voteQty / props.totalVotes) * 100).toFixed(1)}%`}
            </Typography>
            <div className="PokeballDiv">
              <img src={pokeball} alt="Image" className="ResultPokeball" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
