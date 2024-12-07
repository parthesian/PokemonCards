import { useState, useRef } from 'react';
import cardData from './data/cards.json';
import pokedexData from './data/pokedex.json';
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
    setSearchConfig({
      term: pokemon.Name,
      field: 'name'
    });

    // Scroll to the search results
    setTimeout(() => {
      searchRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <Layout>
      <PokemonScrollViewer 
        pokedexData={pokedexData.pokedex} 
        onPokemonClick={handlePokemonClick}
      />

      <CollectionStats 
        pokemon={cardData.pokemon}
        other={cardData.other}
        pokedex={pokedexData.pokedex}
      />
      
      <div ref={searchRef} className="mb-8">
        <SearchFilter 
          onSearch={setSearchConfig}
          onFilterChange={setFilterType}
          currentFilter={filterType}
          value={searchConfig.term}
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