import { useState, useRef } from 'react';
import cardData from './data/cards.json';
import Layout from './components/Layout';
import SearchFilter from './components/Search';
import CardGrid from './components/CardGrid';
import CollectionStats from './components/CollectionStats';
import PokemonScrollViewer from './components/PokemonScrollViewer';

function App() {
  const [searchConfig, setSearchConfig] = useState({
    term: '',
    field: 'name'
  });
  const [filterType, setFilterType] = useState('all');
  const searchRef = useRef(null);

  const handlePokemonClick = (pokemon) => {
    if (pokemon.Collected) {
      setSearchConfig({
        ...searchConfig,
        term: pokemon.Name
      });
      
      // Scroll to search section
      searchRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Layout>
      <PokemonScrollViewer 
        pokedexData={cardData.pokedex}
        onPokemonClick={handlePokemonClick}
      />

      <CollectionStats 
        pokemon={cardData.pokemon}
        other={cardData.other}
        pokedex={cardData.pokedex}
      />
      
      <div className="mb-8" ref={searchRef}>
        <SearchFilter 
          onSearch={setSearchConfig}
          onFilterChange={setFilterType}
          currentFilter={filterType}
          searchTerm={searchConfig.term}
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