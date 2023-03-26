import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import VotePage from "./src/components/VotePage.jsx";
import LoginPage from "./src/components/LoginPage.jsx";
import SignUpPage from "./src/components/SignUpPage.jsx";
import ResultsPage from "./src/components/ResultsPage.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './src/scss/application.scss';

const App = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  //error alert ----
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handleError(message) {
    handleClick();
    setErrorMessage(message);
  }
  //error alert end---

  return (
    <div className="router">
      <header>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </header>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginPage handleError={handleError} navigate={navigate} />
            }
          />
          <Route
            exact
            path="/Vote"
            element={<VotePage handleError={handleError} />}
          />
          <Route
            exact
            path="/SignUp"
            element={<SignUpPage handleError={handleError} />}
          />
          <Route
            exact
            path="/Results"
            element={<ResultsPage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
