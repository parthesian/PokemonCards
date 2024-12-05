import { useState } from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';

const CardGrid = ({ pokemonCards, otherCards, searchConfig, filterType }) => {
  const [activeTab, setActiveTab] = useState('pokemon');

  const normalizeSearch = (text) => {
    if (text === null || text === undefined) return '';
    // Convert delta symbol to 'delta' for searching
    return text.toString().toLowerCase().replace('δ', 'delta');
  };

  const padPokedexNumber = (number) => {
    if (!number) return '';
    // Convert number to 4-digit string with leading zeros
    return number.toString().padStart(4, '0');
  };

  const filterCards = (cards, searchTerm) => {
    if (!Array.isArray(cards)) return [];
    if (!searchTerm) return cards;
    
    const normalizedTerm = normalizeSearch(searchTerm);

    return cards.filter(card => {
      try {
        // Convert card data for searching
        const searchableFields = [
          card.Name,
          card.Code,
          card.Set,
          card.Special,
          card.Number
        ].map(field => normalizeSearch(field));

        // Add padded number if it exists
        if (card.Number) {
          searchableFields.push(padPokedexNumber(card.Number));
        }

        // Return true if any field matches the search term
        return searchableFields.some(field => 
          field.includes(normalizedTerm)
        );
      } catch (error) {
        console.error('Error filtering card:', card, error);
        return false;
      }
    });
  };

  const safeFilter = (cards, term) => {
    try {
      return filterCards(cards, term);
    } catch (error) {
      console.error('Error in filtering:', error);
      return [];
    }
  };

  const filteredPokemon = safeFilter(
    pokemonCards,
    searchConfig.term
  );

  const filteredOther = safeFilter(
    otherCards?.filter(card => filterType === 'all' || card.Type === filterType),
    searchConfig.term
  );

  return (
    <div>
      <div className="tabs">
        <div className="tab-list">
          <button
            className={`tab ${activeTab === 'pokemon' ? 'active' : ''}`}
            onClick={() => setActiveTab('pokemon')}
          >
            Pokemon ({filteredPokemon.length})
          </button>
          <button
            className={`tab ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
          >
            Other Cards ({filteredOther.length})
          </button>
        </div>
      </div>

      <div className="card-grid">
        {activeTab === 'pokemon' 
          ? filteredPokemon.map(card => (
              <CardItem key={card.Code} card={card} type="pokemon" />
            ))
          : filteredOther.map(card => (
              <CardItem key={card.Code} card={card} type="other" />
            ))
        }
      </div>
    </div>
  );
};

CardGrid.propTypes = {
  pokemonCards: PropTypes.arrayOf(PropTypes.shape({
    Code: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Number: PropTypes.string,
    Special: PropTypes.string
  })).isRequired,
  otherCards: PropTypes.arrayOf(PropTypes.shape({
    Code: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired
  })).isRequired,
  searchConfig: PropTypes.shape({
    term: PropTypes.string
  }).isRequired,
  filterType: PropTypes.string.isRequired
};

export default CardGrid;