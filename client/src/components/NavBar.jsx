import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import pokePollBanner from "../assets/PokePollBanner.png";

export default function NavBar(props) {
  return (
    <AppBar
      position="fixed"
      top="0"
      sx={{
        height: "6rem",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        "@media (max-width:600px)": {
          height: "4rem",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          className="NavButton"
          sx={{
            bgcolor: "#42a5f5",
            color: "#ffffff",
            "@media (max-width:600px)": {
              fontSize: "0.7rem",
              padding: "0.3rem",
            },
          }}
          variant="contained"
          onClick={props.handleLogOut}
        >
          Log Out
        </Button>
        <div className="Banner">
          <img className="PokePollImage" src={pokePollBanner} />
        </div>
        <Button
          className="NavButton"
          variant="contained"
          sx={{
            bgcolor: "#42a5f5",
            color: "#ffffff",
            "@media (max-width:600px)": {
              fontSize: "0.7rem",
              padding: "0.3rem",
            },
          }}
          onClick={props.handleResults}
        >
          POLL RESULTS
        </Button>
      </Toolbar>
    </AppBar>
  );
}
