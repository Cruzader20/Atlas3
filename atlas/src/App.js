//import logo from './logo.svg';
// import './App.css';
// import Home from "./web_pages/home";
// import Site from "./web_pages/site";
// function App() {
//   // return (
//   //   <div className="App">
//   //     <Site/>
//   //   </div>
//   // );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import Home from './web_pages/home';
import Site from './web_pages/site';
import Venue from './web_pages/venue';

function App() {
  // Initialize the state to track the selected page
  const [selectedPage, setSelectedPage] = useState('home');

  // Function to handle radio button changes
  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <div className="App">
      <h1>Choose a Page:</h1>
      <label>
        <input
          type="radio"
          value="home"
          checked={selectedPage === 'home'}
          onChange={handlePageChange}
        />
        Place
      </label>
      <label>
        <input
          type="radio"
          value="site"
          checked={selectedPage === 'site'}
          onChange={handlePageChange}
        />
        Site
      </label>

      <label>
        <input
          type="radio"
          value="venue"
          checked={selectedPage === 'venue'}
          onChange={handlePageChange}
        />
        Venue
      </label>

      {/* Render the selected page */}
      {selectedPage === 'home' && <Home />}
      {selectedPage === 'site' && <Site />}
      {selectedPage === 'venue' && <Venue />}
    </div>
  );
}

export default App;
