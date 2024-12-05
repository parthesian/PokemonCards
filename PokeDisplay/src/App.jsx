import { useState } from 'react';
import cardData from './data/cards.json';
import PokemonScrollViewer from './components/PokemonScrollViewer';

function App() {
  const [activeTab, setActiveTab] = useState('pokemon');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPokemon = cardData.pokemon.filter(card =>
    card.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOther = cardData.other.filter(card =>
    card.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || card.Type === filterType)
  );

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Pokemon Card Collection</h1>
        </div>
      </header>

      <main className="container">
      <PokemonScrollViewer pokedexData={cardData.pokedex} />
        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{cardData.summary.completionRate}%</div>
            <div className="stat-label">Pokedex Completion</div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${cardData.summary.completionRate}%` }}
              />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{cardData.summary.uniqueCards}</div>
            <div className="stat-label">Unique Pokemon Cards</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{cardData.summary.totalCards}</div>
            <div className="stat-label">Total Cards</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{cardData.summary.otherCards}</div>
            <div className="stat-label">Other Cards</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <input
            type="text"
            className="search-input"
            placeholder="Search cards..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Trainer">Trainer</option>
            <option value="Energy">Energy</option>
            <option value="Special">Special</option>
          </select>
        </div>

        {/* Tabs */}
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

        {/* Card Grid */}
        <div className="card-grid">
          {activeTab === 'pokemon' ? (
            filteredPokemon.map(card => (
              <div key={card.Code} className="card">
                <div className="card-content">
                  <div>
                    <span>#{card.Number}</span>
                    <h2>{card.Name}</h2>
                  </div>
                  <div className="card-image">
                    <img src={card.Card} alt={`${card.Name} card`} />
                  </div>
                  <div>
                    <div>Set: {card.Set}</div>
                    <div>Quantity: {card.Quantity}</div>
                    {card.Special && <div>Special: {card.Special}</div>}
                    <div>Code: {card.Code}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredOther.map(card => (
              <div key={card.Code} className="card">
                <div className="card-content">
                  <div>
                    <span>{card.Type}</span>
                    <h2>{card.Name}</h2>
                  </div>
                  <div className="card-image">
                    <img src={card.Card} alt={`${card.Name} card`} />
                  </div>
                  <div>
                    <div>Set: {card.Set}</div>
                    <div>Quantity: {card.Quantity}</div>
                    <div>Code: {card.Code}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;