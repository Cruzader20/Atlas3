import React, { useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        email === "admin@admin.com" ? navigate("/admin") : navigate("/main");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  

  return (
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
      
    
  );
};

export default Login;
