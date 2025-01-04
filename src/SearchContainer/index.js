import React from "react";

const SearchContainer = () => {
  const onchangeText = () => {};
  return (
    <div className="search-container">
      <input
        id="search"
        type="text"
        onChange={onchangeText}
        placeholder={"Enter a city"}
      />
    </div>
  );
};
export default SearchContainer;
