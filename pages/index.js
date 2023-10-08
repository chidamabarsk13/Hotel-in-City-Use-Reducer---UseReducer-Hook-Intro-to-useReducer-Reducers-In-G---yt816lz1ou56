import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action) {
    case "FETCH_SUCCESS":
     
    case "FILTER":
     
    default:
   
  }
}
export default function Home() {
   const [state, dispatch] = useReducer(reducer, initialState);
 



  useEffect(() => {
    dispatch({ type: "FILTER"});
  });

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
      />
     
        <p >hotel_name</p>
     
    </div>
  );
  }
  