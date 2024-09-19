import React, { useState } from "react";

const SortBy = ({ sortByOptions, selectedSortBy, setSelectedSortBy }) => {
  const [error, setError] = useState(null);

  const handleSortByChange = (event) => {
    setSelectedSortBy(event.target.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="sortBy">
      <select
        id="sortBySelect"
        onChange={handleSortByChange}
        value={selectedSortBy}
      >
        <option value="">Sort by</option>
        {sortByOptions.map((optObject, index) => {
          return (
            <option key={index} value={index}>
              {optObject.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortBy;
