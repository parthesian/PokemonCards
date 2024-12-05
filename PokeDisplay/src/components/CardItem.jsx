import card_to_set from '../data/card_to_set.json'
import PropTypes from 'prop-types';

const CardItem = ({ card, type }) => {
  const imagePath = '/' + card.Card.replace(/\\/g, '/');

  const renderSpecialBadges = (special) => {
    const badges = [];
    
    if (special?.includes('δ')) {
      badges.push(<span key="δ" className="card-badge-delta">δ</span>);
    }
    
    if (special?.includes('Lv. X')) {
      badges.push(
        <span key="Lv. X" className="card-badge-lvx">
          LV. <span className="card-badge-lvx-x">X</span>
        </span>
      );
    }
    
    if (special?.toLowerCase().includes('ex')) {
      badges.push(
        <img 
          key="ex" 
          src="/badges/ex.png" 
          alt="EX" 
          className="card-badge-ex" 
        />
      );
    }
    
    return badges;
  };

  if (type === 'pokemon') {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <h2 className="card-title">
              {card.Name}{' '}  {/* Added explicit space here */}
              {card.Special && (
                <span className="card-badges">
                  {renderSpecialBadges(card.Special)}
                </span>
              )}
            </h2>
          </div>
          
          <div className="card-image">
            <img src={imagePath} alt={`${card.Name} card`} />
          </div>
          
          <div className="card-footer">
            <span className="card-quantity">x{card.Quantity}</span>
            <img 
              src={`/sets/${card_to_set[card.Set]}`}
              alt={card.Set}
              className="set-logo"
            />
          </div>
          
          <div className="card-info-footer">
            <span className="card-number">
                <b>#{card.Number.toString().padStart(4, '0')}</b>
              </span>
              <span className="card-code">
                {card.Code}
              </span>
          </div>
          
          {card.Special && (
            <div className="card-special">
              <span>Special: </span>
              <span>{card.Special}</span>
            </div>
          )}
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
        
        <div className="card-footer">
          <span className="card-quantity">x{card.Quantity}</span>
          <img 
            src={`/sets/${card_to_set[card.Set]}`}
            alt={card.Set}
            className="set-logo"
          />
        </div>
        
        <div className="card-code-footer">
          {card.Code}
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