import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchFilter = ({ onSearch, onFilterChange, currentFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch({ term: value });
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, number, code, set, or special..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <select 
        className="filter-select"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="Trainer">Trainer</option>
        <option value="Energy">Energy</option>
        <option value="Special">Special</option>
      </select>
    </div>
  );
};

SearchFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired
};

export default SearchFilter;