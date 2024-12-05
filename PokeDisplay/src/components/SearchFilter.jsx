import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilter = ({ onSearch, onFilterChange, currentFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search cards..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={currentFilter} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Trainer">Trainer</SelectItem>
            <SelectItem value="Energy">Energy</SelectItem>
            <SelectItem value="Special">Special</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired
};

export default SearchFilter;