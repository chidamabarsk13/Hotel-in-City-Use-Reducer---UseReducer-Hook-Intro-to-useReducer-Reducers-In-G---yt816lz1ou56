import React, { useReducer, useEffect } from "react";

const initialState = { hotels: [], filteredHotels: [], loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        hotels: action.payload,
        filteredHotels: action.payload,
        loading: false,
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
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cityName, setCityName] = React.useState("");
  let timeoutId;

  useEffect(() => {
    // Fetch data from the API when the component mounts
    dispatch({ type: "SET_LOADING" });

    const fetchData = async () => {
      try {
        const response = await fetch("https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels");
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching data" });
      }
    };

    fetchData();
  }, []);

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);

    // Debounce the input changes to avoid frequent API requests
    clearTimeout(timeoutId);
    timeoutId = setTimeout(filterHotels, 500);
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

      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}

      <ul>
        {state.filteredHotels.map((hotel, index) => (
          <li key={index}>{hotel.hotel_name}</li>
        ))}
      </ul>
    </div>
  );
}
