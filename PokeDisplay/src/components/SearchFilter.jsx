import PropTypes from 'prop-types';

const SearchFilter = ({ onSearch, onFilterChange, currentFilter }) => {
  return (
    <div className="search-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, code, or set..."
        onChange={(e) => onSearch({ term: e.target.value })}
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