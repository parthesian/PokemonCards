import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch, searchTerm }) => {
  const handleSearch = (value) => {
    onSearch({ term: value });
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, number, code, set, or special..."
        value={searchTerm || ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string
};

export default Search;