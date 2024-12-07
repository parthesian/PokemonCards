import React from 'react';
import PropTypes from 'prop-types';
import regionData from '../data/region_to_dex.json';

const RegionalCompletion = ({ pokedex, region, data }) => {
  const regionalPokemon = pokedex.filter(p => 
    parseInt(p.Number) >= data.start && parseInt(p.Number) <= data.end
  );
  const collectedCount = regionalPokemon.filter(p => p.Collected).length;
  const completionRate = Math.round((collectedCount / regionalPokemon.length) * 100);

  return (
    <div className="region-stat">
      <div className="region-header">
        <span className="region-name">{region}</span>
        <span className="region-count">{collectedCount}/{regionalPokemon.length}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  );
};

const SplitStatCard = ({ title, leftValue, rightValue, leftLabel, rightLabel }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="split-stat-content">
      <div className="split-stat-half">
        <div className="stat-value">{leftValue}</div>
        <div className="split-stat-label">{leftLabel}</div>
      </div>
      <div className="split-stat-half">
        <div className="stat-value">{rightValue}</div>
        <div className="split-stat-label">{rightLabel}</div>
      </div>
    </div>
  </div>
);

const CollectionStats = ({ pokemon, other, pokedex }) => {
  const stats = {
    uniquePokemonCards: pokemon.length,
    uniqueOtherCards: other.length,
    totalPokemonCards: pokemon.reduce((sum, card) => sum + card.Quantity, 0),
    totalOtherCards: other.reduce((sum, card) => sum + card.Quantity, 0),
    totalCards: pokemon.reduce((sum, card) => sum + card.Quantity, 0) +
                other.reduce((sum, card) => sum + card.Quantity, 0),
    completionRate: Math.round((pokedex.filter(p => p.Collected).length / pokedex.length) * 100)
  };

  return (
    <div className="stats-container">
      <style>
        {`
          .stats-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 2rem;
          }

          .completion-card {
            background: var(--card-background);
            border-radius: 0.5rem;
            box-shadow: var(--shadow);
            padding: 1.5rem;
          }

          .completion-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }

          .regions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .region-stat {
            padding: 0.75rem;
            background: var(--background-color);
            border-radius: 0.375rem;
          }

          .region-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .region-name {
            font-weight: bold;
            color: var(--text-primary);
          }

          .region-count {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }

          .cards-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }

          .stat-card {
            background: var(--card-background);
            border-radius: 0.5rem;
            box-shadow: var(--shadow);
            padding: 1rem;
          }

          .stat-title {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            text-align: center;
          }

          .split-stat-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .split-stat-half {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
          }

          .split-stat-half:first-child {
            border-right: 1px solid #e5e7eb;
          }

          .stat-value {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--text-primary);
          }

          .split-stat-label {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin-top: 0.25rem;
          }

          .progress-bar {
            width: 100%;
            height: 0.5rem;
            background-color: #e5e7eb;
            border-radius: 0.25rem;
            overflow: hidden;
          }

          .progress-bar-fill {
            height: 100%;
            background-color: var(--primary-color);
            transition: width 0.3s ease;
          }

          @media (max-width: 768px) {
            .cards-stats {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>

      <div className="completion-card">
        <div className="completion-header">
          <div>
            <div className="stat-value">{stats.completionRate}%</div>
            <div className="stat-title">Total Pokedex Completion</div>
          </div>
          <div className="progress-bar" style={{ width: '200px' }}>
            <div 
              className="progress-bar-fill"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>

        <div className="regions-grid">
          {Object.entries(regionData)
            .sort((a, b) => a[1].generation - b[1].generation)
            .map(([region, data]) => (
              <RegionalCompletion 
                key={region}
                pokedex={pokedex}
                region={region}
                data={data}
              />
            ))}
        </div>
      </div>

      <div className="cards-stats">
        <SplitStatCard
          title="Pokemon Cards"
          leftValue={stats.uniquePokemonCards}
          rightValue={stats.totalPokemonCards}
          leftLabel="Unique"
          rightLabel="Total"
        />

        <SplitStatCard
          title="Other Cards"
          leftValue={stats.uniqueOtherCards}
          rightValue={stats.totalOtherCards}
          leftLabel="Unique"
          rightLabel="Total"
        />

        <SplitStatCard
          title="All Cards"
          leftValue={stats.uniquePokemonCards + stats.uniqueOtherCards}
          rightValue={stats.totalCards}
          leftLabel="Unique"
          rightLabel="Total"
        />

        <div className="stat-card">
          <div className="stat-title">Collection Rate</div>
          <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
            <div className="stat-value">
              {Math.round((stats.totalCards / (stats.uniquePokemonCards + stats.uniqueOtherCards)) * 100) / 100}x
            </div>
            <div className="split-stat-label">Avg Copies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegionalCompletion.propTypes = {
  pokedex: PropTypes.arrayOf(PropTypes.shape({
    Number: PropTypes.string.isRequired,
    Collected: PropTypes.bool.isRequired
  })).isRequired,
  region: PropTypes.string.isRequired,
  data: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    generation: PropTypes.number.isRequired
  }).isRequired
};

SplitStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  leftValue: PropTypes.number.isRequired,
  rightValue: PropTypes.number.isRequired,
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired
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