import PropTypes from 'prop-types';

const CardItem = ({ card, type }) => {
  const imagePath = '/' + card.Card.replace(/\\/g, '/');

  if (type === 'pokemon') {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <span className="card-number">#{card.Number}</span>
            <h2 className="card-title">{card.Name}</h2>
          </div>
          
          <div className="card-image">
            <img src={imagePath} alt={`${card.Name} card`} />
          </div>
          
          <div className="card-details">
            <div>
              <span>Set:</span>
              <span>{card.Set}</span>
            </div>
            <div>
              <span>Quantity:</span>
              <span>{card.Quantity}</span>
            </div>
            {card.Special && (
              <div>
                <span>Special:</span>
                <span>{card.Special}</span>
              </div>
            )}
          </div>
          <div className="card-code">
            Code: {card.Code}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <span className="card-type">{card.Type}</span>
          <h2 className="card-title">{card.Name}</h2>
        </div>
        
        <div className="card-image">
          <img src={imagePath} alt={`${card.Name} card`} />
        </div>
        
        <div className="card-details">
          <div>
            <span>Set:</span>
            <span>{card.Set}</span>
          </div>
          <div>
            <span>Quantity:</span>
            <span>{card.Quantity}</span>
          </div>
        </div>
        <div className="card-code">
          Code: {card.Code}
        </div>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.oneOfType([
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Card: PropTypes.string.isRequired,
      Set: PropTypes.string.isRequired,
      Quantity: PropTypes.number.isRequired,
      Code: PropTypes.string.isRequired,
      Number: PropTypes.string.isRequired,
      Special: PropTypes.string,
    }),
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Card: PropTypes.string.isRequired,
      Set: PropTypes.string.isRequired,
      Quantity: PropTypes.number.isRequired,
      Code: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  type: PropTypes.oneOf(['pokemon', 'other']).isRequired,
};

export default CardItem;