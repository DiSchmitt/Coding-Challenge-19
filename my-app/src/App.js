//U4888-2664
//Task 1: Acts as the main container for the tour list component, typically named Gallery.js.
//Set up and utilize any necessary global states or context providers.
//it doesnt contain multiple pages/routes so irrelevant

import React from "react";
import "./App.css"; 
import Gallery from "./Gallery";

function App() {
  return (
    <div className="App">
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
