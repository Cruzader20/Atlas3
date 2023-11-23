import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  child,
  query,
  orderByChild,
  equalTo,
  remove,
} from "firebase/database";
import { database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate,NavLink } from "react-router-dom";

function Admin() {
  const [messages, setMessages] = useState(null);
  const [userCity, setUserCity] = useState("");
  const [userCategory, setUserCategory] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userSite, setUserSite] = useState("");
  const navigate = useNavigate();

  const handleUserCityChange = (event) => {
    setUserCity(event.target.value);
  };

  const handleUserSiteChange = (event) => {
    setUserSite(event.target.value);
  };

  const handleUserCategoryChange = (event) => {
    setUserCategory(event.target.value);
  };

  const handleUserImageChange = (event) => {
    setUserImage(event.target.value);
  };

  const handleUserDescriptionChange = (event) => {
    setUserDescription(event.target.value);
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

  const addNewPlace = async (city, place, category) => {
    // Check if the city exists in the database
    //const cityRef = ref(database, '/Place'); // Assuming 'city' is the city name, e.g., 'Agra'

    //const citySnapshot = await get(cityRef);
    //const entryExistsQuery = query(ref(database, `/Place/${city}`), orderByChild('place'), equalTo(place));
    const cityRef = ref(database, `/Place/${city}`);
    const placeSnapshot = await get(child(cityRef, place));

    //const entrySnapshot = await get(entryExistsQuery);

    // if (citySnapshot.exists()) {
    //     // The city exists, so add a new place with its category
    //     const newPlaceData = {
    //         [place]: category
    //     };
    if (messages && messages[city] && !placeSnapshot.exists()) {
      // The city exists, so add a new place with its category
      const newPlaceData = {
        [place]: category,
      };

      try {
        // Push the new place data into the city node
        //const newPlaceRef = push(ref(database, `/Place/${city}/${place}`));
        await set(ref(database, `/Venue/${city}/${place}`), category);
        console.log("New place added successfully");
      } catch (error) {
        console.error("Error adding new place:", error);
      }
    } else {
      console.log("City does not exist. You can handle this case accordingly.");
    }
  };

  const deletePlace = async (city, place) => {
    if (messages && messages[city] && messages[city][place]) {
      const cityRef = ref(database, `/Venue/${city}`);
      try {
        // Remove the place from the city node
        await remove(child(cityRef, place));
        console.log("Place deleted successfully");
      } catch (error) {
        console.error("Error deleting place:", error);
      }
    } else {
      console.log(
        "City or place does not exist. You can handle this case accordingly."
      );
    }
  };

  return (
    <div className="top">
      <div className="admin">
        <h2>Welcome Admin</h2>
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
        <TextField
          id="userCityInput"
          value={userCity}
          onChange={handleUserCityChange}
          label="Enter City"
          variant="outlined"
          color="secondary"
          margin="normal"
        />

        <TextField
          id="userSiteInput"
          value={userSite}
          onChange={handleUserSiteChange}
          label="Enter Site"
          variant="outlined"
          color="secondary"
          margin="normal"
        />

        <TextField
          id="userCategoryInput"
          value={userCategory}
          onChange={handleUserCategoryChange}
          label="Enter Category"
          variant="outlined"
          color="secondary"
          margin="normal"
        />

        <TextField
          id="userImageInput"
          value={userImage}
          onChange={handleUserImageChange}
          label="Enter Image Link"
          variant="outlined"
          color="secondary"
          margin="normal"
        />

        <TextField
          id="userDescriptionInput"
          value={userDescription}
          onChange={handleUserDescriptionChange}
          label="Enter Description"
          variant="outlined"
          color="secondary"
          margin="normal"
        />

        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => addNewPlace("NewCity", "NewPlace", "NewCategory")}
            sx={{ mx: 1 }}
          >
            Add New Venue
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deletePlace("Airport", "NewPlace")}
          >
            Delete
          </Button>
        </div>
        <p>
               <NavLink to="/main">Go to Main Page</NavLink>
            </p>
      </div>
      
    </div>
  );
}

export default Admin;
