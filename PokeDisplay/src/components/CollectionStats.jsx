import React from 'react';
import PropTypes from 'prop-types';

const CollectionStats = ({ pokemon, other, pokedex }) => {
  // Calculate stats on component render
  const stats = {
    uniqueCards: pokemon.length + other.length,
    totalCards: pokemon.reduce((sum, card) => sum + card.Quantity, 0) +
                other.reduce((sum, card) => sum + card.Quantity, 0),
    otherCards: other.reduce((sum, card) => sum + card.Quantity, 0),
    completionRate: Math.round((pokedex.filter(p => p.Collected).length / pokedex.length) * 100)
  };

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{stats.completionRate}%</div>
        <div className="stat-label">Pokedex Completion</div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{stats.uniqueCards}</div>
        <div className="stat-label">Unique Pokemon Cards</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{stats.totalCards}</div>
        <div className="stat-label">Total Cards</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{stats.otherCards}</div>
        <div className="stat-label">Other Cards</div>
      </div>
    </div>
  );
};

CollectionStats.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.shape({
    Number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Name: PropTypes.string.isRequired,
    Card: PropTypes.string.isRequired,
    Quantity: PropTypes.number.isRequired,
    Set: PropTypes.string.isRequired,
    Code: PropTypes.string.isRequired,
    Special: PropTypes.string
  })).isRequired,
  other: PropTypes.arrayOf(PropTypes.shape({
    Type: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Card: PropTypes.string.isRequired,
    Quantity: PropTypes.number.isRequired,
    Set: PropTypes.string.isRequired,
    Code: PropTypes.string.isRequired
  })).isRequired,
  pokedex: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Collected: PropTypes.bool.isRequired
  })).isRequired
};

export default CollectionStats;