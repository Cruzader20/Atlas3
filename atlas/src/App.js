import React, { useState, useEffect } from "react";

import "./App.css";

import Login from "./web_pages/login";
import Signup from "./web_pages/signup";
import Main from "./web_pages/main";
import Admin from "./web_pages/admin";
import { Route, Routes } from "react-router-dom";

// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

function App() {
  // Initialize the state to track the selected page

  

  
  // const onLogin = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // navigate("/main");
  //       email === "admin@admin.com" ? navigate("/admin") : navigate("/main");
  //       console.log(user);
  //       setIsloggedIn(true);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //       alert(errorMessage);
  //     });
  // };

  

  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route
          path= "/signup" element={<Signup />}
        />
        <Route path="/main"  element={<Main/>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* {isLoggedIn ? (
        <div>
          <>
            <nav>
              <div>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </>{" "}
        </div>
      ) : (
        <>
          <main>
            <section>
              <div>
                <h1> Login </h1>
                <form>
                  <div>
                    <TextField
                      id="email-address"
                      label="Email address"
                      variant="outlined"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ m: 0.5 }}
                    />
                  </div>

                  <div>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ m: 0.5 }}
                    />
                  </div>

                  <div>
                    <Button
                      variant="contained"
                      onClick={onLogin}
                      color="secondary"
                      sx={{ m: 0.5 }}
                    >
                      Login
                    </Button>
                  </div>
                </form>

                <p className="text-sm text-white text-center">
                  No account yet? <NavLink to="/signup">Sign up</NavLink>
                </p>
              </div>
            </section>
          </main>
        </>
      )} */}
    </div>
  );
}

export default App;
