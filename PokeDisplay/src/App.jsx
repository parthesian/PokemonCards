import { useState } from 'react';
import cardData from './data/cards.json';
import Layout from './components/Layout';
import SearchFilter from './components/SearchFilter';
import CardGrid from './components/CardGrid';
import CollectionStats from './components/CollectionStats';
import PokemonScrollViewer from './components/PokemonScrollViewer';

function App() {
  const [searchConfig, setSearchConfig] = useState({
    term: '',
    field: 'name'
  });
  const [filterType, setFilterType] = useState('all');

  return (
    <Layout>
      
      <PokemonScrollViewer pokedexData={cardData.pokedex} />

      <CollectionStats summary={cardData.summary} />
      
      <div className="mb-8">
        <SearchFilter 
          onSearch={setSearchConfig}
          onFilterChange={setFilterType}
          currentFilter={filterType}
        />
      </div>
      
      <CardGrid 
        pokemonCards={cardData.pokemon}
        otherCards={cardData.other}
        searchConfig={searchConfig}
        filterType={filterType}
      />
    </Layout>
  );
}

export default App;