import React, { useState } from "react";
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
    //sign up fetch call
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
          props.handleError("Username already exists");
          setUsername("");
          setPassword("");
          navigate("/SignUp"); // redirect back to sign up page
        }
        if (response.status === 422) {
          props.handleError("Username and password fields cannot be empty");
          setUsername("");
          setPassword("");
          navigate("/SignUp"); // redirect back to sign up page
        }
        if (response.status === 200) {
          navigate("/"); // redirect back to sign in
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        props.handleError(error.message);
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
            id="filled-basic-1"
            label="Password"
            type="password"
            variant="filled"
            onChange={handlePasswordChange}
            value={password}
            sx={{
              borderRadius: "8px",
              '& input[type="password"]': {
                WebkitTextSecurity: "disc",
              },
            }}
          />
          <div className="underForm">
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
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
