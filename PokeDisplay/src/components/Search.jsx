import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch, value }) => {
  const handleSearch = (newValue) => {
    onSearch({ term: newValue });
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, number, code, set..."
        value={value || ''} // Control the input value from props
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default Search;