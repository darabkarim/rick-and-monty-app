import React from "react";

function FilterOptions({ filters, onFilterChange }) {
  const handleFilterChange = (filterType, e) => {
    onFilterChange(filterType, e.target.value);
  };

  return (
    <div className="my-3">
      <h5>Filter Options</h5>
      <div className="row">
        <div className="col-md-2">
          <label>Status:</label>
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e)}
          >
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="col-md-2">
          <label>Gender:</label>
          <select
            className="form-select"
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e)}
          >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="col-md-2">
          <label>Species:</label>
          <select
            className="form-select"
            value={filters.species}
            onChange={(e) => handleFilterChange("species", e)}
          >
            <option value="All">All</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Poopybutthole">Poopybutthole</option>
            <option value="Unknown">Unknown</option>
            <option value="Animal">Animal</option>
            <option value="Disease">Disease</option>
            <option value="Robot">Robot</option>
            <option value="Cronenberg">Cronenberg</option>
            <option value="Planet">Planet</option>
          </select>
        </div>

        {/* Add new filters for location, episode, and type */}
        <div className="col-md-2">
          <label>Location:</label>
          <input
            type="text"
            className="form-control"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e)}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
