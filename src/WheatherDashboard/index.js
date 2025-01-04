import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLattitudeAndLongitude } from "./WheatherSlice";

const WheatherDashboard = (props) => {
  const { getLattitudeAndLongitude } = props;
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  //const dispatch = useDispatch();

  const onchangeText = (e) => {
    const value = e.value;
    if (!value) {
      setError("Please enter valid city");
    }
    setSearchText(value);
    // dispatch(getLattitudeAndLongitude(value));
  };

  return (
    <div className="WheatherDashboard-container">
      <div className="WheatherDashboard-header">
        <h1> Wheather Dashboard</h1>
      </div>
      <div className="search-container">
        <input
          id="search"
          type="text"
          onChange={onchangeText}
          value={searchText}
          placeholder={"Enter a city"}
        />
      </div>
      <div className="wheather-card"></div>
    </div>
  );
};

export default WheatherDashboard;
