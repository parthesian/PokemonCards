import PropTypes from 'prop-types';

const CollectionStats = ({ summary }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{summary.completionRate}%</div>
        <div className="stat-label">Pokedex Completion</div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${summary.completionRate}%` }}
          />
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{summary.uniqueCards}</div>
        <div className="stat-label">Unique Pokemon Cards</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{summary.totalCards}</div>
        <div className="stat-label">Total Cards</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{summary.otherCards}</div>
        <div className="stat-label">Other Cards</div>
      </div>
    </div>
  );
};

CollectionStats.propTypes = {
  summary: PropTypes.shape({
    completionRate: PropTypes.number.isRequired,
    uniqueCards: PropTypes.number.isRequired,
    totalCards: PropTypes.number.isRequired,
    otherCards: PropTypes.number.isRequired
  }).isRequired
};

export default CollectionStats;