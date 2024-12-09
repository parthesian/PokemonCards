import { useState, useRef } from 'react';
import cardData from './data/cards.json';
import pokedexData from './data/pokedex.json';
import Layout from './components/Layout';
import SearchFilter from './components/Search';
import CardGrid from './components/CardGrid';
import CollectionStats from './components/CollectionStats';
import PokemonScrollViewer from './components/PokemonScrollViewer';
import { normalizeCardData, normalizePokedexData } from './utils/dataNormalizer';

function App() {
  const normalizedCards = normalizeCardData(cardData);
  const normalizedPokedex = normalizePokedexData(pokedexData);

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
        pokedexData={normalizedPokedex.pokedex}
        onPokemonClick={handlePokemonClick}
      />

      <CollectionStats 
        pokemon={normalizedCards.pokemon}
        other={normalizedCards.other}
        pokedex={normalizedPokedex.pokedex}
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
        pokemonCards={normalizedCards.pokemon}
        otherCards={normalizedCards.other}
        searchConfig={searchConfig}
        filterType={filterType}
      />
    </Layout>
  );
}

export default App;