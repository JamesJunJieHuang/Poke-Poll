import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokePollBanner from "../assets/PokePollBanner.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform login logic here
    //console.log("before fetch");
    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Username already exists");
        }
        return response.json();
      })
      .then((data) => {
        //console.log("Success:", data);
        navigate("/"); // redirect to the home page on success aka login page
      })
      .catch((error) => {
        console.error("Error:", error);
        props.handleError(error.message)
        navigate("/SignUp"); // redirect back to sign up page
      });
  };

  return (
    <section className="SignUpPage">
      <div className="Banner">
        <Link to="/">
          <img className="RegisterPokePollImage" src={pokePollBanner} />
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="SignUpForm">
          <TextField
            id="filled-basic"
            className="textfield"
            label="Username"
            variant="filled"
            margin="normal"
            onChange={handleUsernameChange}
            value={username}
            sx={{
              borderRadius: "8px",
            }}
          />
          <TextField
            className="textfield"
            id="filled-basic"
            label="Password"
            variant="filled"
            onChange={handlePasswordChange}
            value={password}
            sx={{
              borderRadius: "8px",
            }}
          />
          <div className="underForm">
            <Button
              type="submit"
              onClick={handleSubmit}
              variant='contained'
              sx={{
                bgcolor: "#42a5f5",
                color: "#ffffff",
                marginTop: "1rem",
              }}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
