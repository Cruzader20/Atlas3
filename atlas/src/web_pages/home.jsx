// App.js
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { getDatabase, ref, get, set, push, child, query, orderByChild, equalTo, remove } from 'firebase/database';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';





function Home() {
    const [messages, setMessages] = useState(null);
    const [userCity, setUserCity] = useState('');
    const [similarityResults, setSimilarityResults] = useState({});
    
    useEffect(() => {
      // Fetch data when the component mounts
      const fetchData = async () => {
        try {
          const dataRef = ref(database, '/Place');
          const snapshot = await get(dataRef);
  
          if (snapshot.exists()) {
            const messagesData = snapshot.val();
            console.log(typeof messagesData)
            //console.log(snapshot.val())
            console.log(messagesData)
            
            
            //const messageArray = Object.values(dic);
            
            
            setMessages(messagesData);
            console.log("hello")
            //console.log(messageArray)
            //console.log(messages["Agra"])
            
            console.log(typeof messages)
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
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
            [place]: category
        };

          try {
              // Push the new place data into the city node
              //const newPlaceRef = push(ref(database, `/Place/${city}/${place}`));
              await set(ref(database, `/Place/${city}/${place}`), category);
              console.log('New place added successfully');
          } catch (error) {
              console.error('Error adding new place:', error);
          }
      } else {
          console.log('City does not exist. You can handle this case accordingly.');
      }
  };

  const deletePlace = async (city, place) => {
    if (messages && messages[city] && messages[city][place]) {
        const cityRef = ref(database, `/Place/${city}`);
        try {
            // Remove the place from the city node
            await remove(child(cityRef, place));
            console.log('Place deleted successfully');
        } catch (error) {
            console.error('Error deleting place:', error);
        }
    } else {
        console.log('City or place does not exist. You can handle this case accordingly.');
    }
};
  


const handleUserCityChange = (event) => {
  setUserCity(event.target.value);
};



function generateTrigrams(str) {
  const trigrams = [];
  for (let i = 0; i < str.length - 1; i++) {
    trigrams.push(str.substring(i, i + 2));
  }
  return trigrams;
}

function trigramSimilarity(str1, str2) {
  const trigrams1 = generateTrigrams(str1);
  const trigrams2 = generateTrigrams(str2);

  // Create sets to store unique trigrams
  const set1 = new Set(trigrams1);
  const set2 = new Set(trigrams2);

  // Find the intersection of trigrams
  let intersection = 0;
  set1.forEach(trigram => {
    if (set2.has(trigram)) {
      intersection++;
    }
  });

  // Calculate the Jaccard similarity coefficient
  const union = set1.size + set2.size - intersection;
  const similarity = intersection / union;

  return similarity;
}


const findSimilarCities = () => {
  const results = {};
  if (userCity && messages) {
    Object.keys(messages).forEach((city) => {
        console.log(userCity)
        console.log(city)
        const similarity = trigramSimilarity(userCity, city);
        console.log(similarity)
        if (similarity >= 0.2) { // Adjust the threshold as needed
          results[city] = messages[city];
          //console.log(results[city])
          setUserCity('');
          
        }
      
    });
  }
  setSimilarityResults(results);
  console.log(similarityResults)
};

    return (      

      <div>
        
      
      <Button variant="outlined" color="secondary" onClick={() => addNewPlace('Amaravati', 'NewPlace1', 'NewCategory')} sx={{ mx: 1 }}>
                Add New Place
            </Button>
      <Button variant="outlined" color="secondary" onClick={() => deletePlace('Aurangabad', 'Ajanta Caves')}>Delete</Button>  

      <div>
        {/* <label htmlFor="userCityInput">Enter your city:</label>
        <input
          type="text"
          id="userCityInput"
          value={userCity}
          onChange={handleUserCityChange}
        /> */}

      <TextField id="userCityInput"
          value={userCity}
          onChange={handleUserCityChange} label="Enter City" variant="outlined" color='secondary' margin="normal" />
        
        <Fab color="secondary" aria-label="edit" onClick={findSimilarCities} size="medium" margin="normal" sx={{ my: 2, mx: 1 }}>
        <SearchIcon/>
      </Fab>

        
      </div> 
      <h1>Places to Visit in Different City</h1>
      
      <ul>
      {/* {Object.entries(similarityResults).map(([city, similarity]) => (
          <li key={city}>
            <strong>{city}</strong>
          </li>
        ))} */}

<Stack direction="row" spacing={2}>{similarityResults ? (
        Object.entries(similarityResults).map(([city, places]) => (
          <div key={city}>
            <h2>{city}</h2>
            <ul>
              {Object.entries(places).map(([place, category]) => (
                <li key={place}>
                  <strong>{place}</strong>: {category}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        // Display a message when there are no messages
        <p>No messages available.</p>
      )}  </Stack>
      </ul>
    </div>
    );
  }
  
  export default Home;