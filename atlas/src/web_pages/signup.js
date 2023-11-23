import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1> Sign Up </h1>
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

              <Button type="submit" onClick={onSubmit} variant="contained"
                      color="secondary"
                      sx={{ m: 0.5 }}>
                Sign up
              </Button>
            </form>

            <p>
              Already have an account? <NavLink to="/">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
