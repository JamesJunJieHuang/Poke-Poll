import * as React from "react";
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
            display: "flex", // Add flex display to center the content vertically
            alignItems: "center", // Center content vertically
            backgroundColor: "#4dabf5", // Change the color of the card
            color: "white", // Change the text color
          }}
        >
          <CardContent className="ResultBarContent">
            <Typography className="ResultBarText" fontSize="1rem">
              {`${props.voteQty}`}
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
            display: "flex", // Add flex display to center the content vertically
            alignItems: "center", // Center content vertically
            backgroundColor: "FD6F51", // Change the color of the card
            color: "white", // Change the text color
          }}
        >
          <CardContent className="ResultBarContent">
            <Typography className="ResultBarText" fontSize="1rem">
              {`${props.voteQty}`}
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
