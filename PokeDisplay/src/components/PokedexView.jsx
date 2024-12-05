import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';

const PokedexView = ({ pokedexData, searchTerm }) => {
  const [showCollected, setShowCollected] = useState('all'); // 'all', 'collected', 'missing'

  const filteredData = pokedexData.filter(pokemon => {
    const matchesSearch = pokemon.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = showCollected === 'all' ||
      (showCollected === 'collected' && pokemon.Collected) ||
      (showCollected === 'missing' && !pokemon.Collected);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <Toggle 
          pressed={showCollected === 'all'} 
          onPressedChange={() => setShowCollected('all')}
        >
          All
        </Toggle>
        <Toggle 
          pressed={showCollected === 'collected'} 
          onPressedChange={() => setShowCollected('collected')}
        >
          Collected
        </Toggle>
        <Toggle 
          pressed={showCollected === 'missing'} 
          onPressedChange={() => setShowCollected('missing')}
        >
          Missing
        </Toggle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((pokemon) => (
          <Card 
            key={pokemon.Number}
            className={`${pokemon.Collected ? 'bg-green-50' : 'bg-gray-50'}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">#{pokemon.Number}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  pokemon.Collected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pokemon.Collected ? 'Collected' : 'Missing'}
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-1">{pokemon.Name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

PokedexView.propTypes = {
  pokedexData: PropTypes.arrayOf(
    PropTypes.shape({
      Number: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      Collected: PropTypes.bool.isRequired
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default PokedexView;