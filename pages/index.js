import React, { useReducer, useEffect } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        hotels: action.payload,
        filteredHotels: action.payload,
      };
    case "FILTER":
      const { cityName } = action.payload;
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.city.toLowerCase() === cityName.toLowerCase()
      );
      return {
        ...state,
        filteredHotels,
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cityName, setCityName] = React.useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      });
  }, []);

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const filterHotels = () => {
    dispatch({ type: "FILTER", payload: { cityName } });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={handleCityNameChange}
      />
      <button onClick={filterHotels}>Filter</button>
      <ul>
        {state.filteredHotels.map((hotel, index) => (
          <li key={index}>{hotel.hotel_name}</li>
        ))}
      </ul>
    </div>
  );
}
