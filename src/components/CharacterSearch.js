import React, { useState } from 'react';

function CharacterSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleInputChange}
        aria-describedby="search-addon"
      />
    </div>
  );
}

export default CharacterSearch;
