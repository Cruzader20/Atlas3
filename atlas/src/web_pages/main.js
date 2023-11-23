import React, { useState,useEffect} from "react";
import { auth } from "../firebase";
import Home from "./home";
import Site from "./site";
import Venue from "./venue";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Map from "../map.png";
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Main() {
  const [selectedPage, setSelectedPage] = useState("home");
  const navigate = useNavigate();
 

  const handlePageChange = (value) => {
    setSelectedPage(value);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        
      }
    });
  }, []);
  
  return (
    <div>
     <div>
          <>
        
            <nav>
              <div>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{ m: 2 }}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </>{" "}
        </div>
      <div className="top">
        <Box
          alignItems="center"
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <Box sx={{ my: 3, mx: 2 }}>
            <img src={Map} alt="Logo" className="logo" />
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  color="secondary"
                >
                  Select
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              Search your next destination!
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                color={selectedPage === "home" ? "secondary" : "default"}
                label="Search by place"
                value="home"
                onClick={() => handlePageChange("home")}
              />
              <Chip
                color={selectedPage === "site" ? "secondary" : "default"}
                label="Search by site"
                value="site"
                onClick={() => handlePageChange("site")}
              />
              <Chip
                color={selectedPage === "venue" ? "secondary" : "default"}
                label="Search by venue"
                value="venue"
                onClick={() => handlePageChange("venue")}
              />
            </Stack>
          </Box>
        </Box>
      </div>

      {/* Render the selected page */}

      {selectedPage === "home" && <Home />}
      {selectedPage === "site" && <Site />}
      {selectedPage === "venue" && <Venue />}
    </div>
  );
}

export default Main;
