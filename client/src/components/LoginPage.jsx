import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokePollBanner from "../assets/PokePollBanner.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPage = (props) => {
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
    fetch("/api/user/login", {
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
        if (response.status === 401) {
          throw new Error("Incorrect Login Information");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/Vote"); // redirect to the vote page on success
      })
      .catch((error) => {
        console.error("Error:", error);
        props.handleError(error.message);
        setUsername("");
        setPassword("");
        navigate("/"); // redirect back to login page
      });
  };

  return (
    <section className="LogInPage">
      <div className="Banner">
        <img className="LogInPokePollImage" src={pokePollBanner} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="LoginForm">
          <TextField
            className="textfield"
            id="filled-basic"
            label="Username"
            variant="filled"
            onChange={handleUsernameChange}
            value={username}
            margin="normal"
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
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#42a5f5",
              color: "#ffffff",
              marginTop: "1rem",
            }}
          >
            Log In
          </Button>
        </form>
        <div className="underForm">
          <Link className="link" to="/SignUp">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#42a5f5",
                color: "#ffffff",
              }}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
