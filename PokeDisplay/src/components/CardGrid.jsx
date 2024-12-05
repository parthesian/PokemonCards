import { useState } from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';

const CardGrid = ({ pokemonCards, otherCards, searchConfig, filterType }) => {
  const [activeTab, setActiveTab] = useState('pokemon');

  const filterCards = (cards, searchTerm) => {
    if (!cards) return [];
    const term = searchTerm.toLowerCase();
    return cards.filter(card => 
      card.Name.toLowerCase().includes(term) ||
      card.Code.toLowerCase().includes(term) ||
      card.Set.toLowerCase().includes(term)
    );
  };

  const filteredPokemon = filterCards(
    pokemonCards,
    searchConfig.term
  );

  const filteredOther = filterCards(
    otherCards.filter(card => filterType === 'all' || card.Type === filterType),
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
  })).isRequired,
  otherCards: PropTypes.arrayOf(PropTypes.shape({
    Code: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
  })).isRequired,
  searchConfig: PropTypes.shape({
    term: PropTypes.string.isRequired
  }).isRequired,
  filterType: PropTypes.string.isRequired
};

export default CardGrid;