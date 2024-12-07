import React from 'react';
import PropTypes from 'prop-types';
import card_to_set from '../data/card_to_set.json';

const CardItem = ({ card, type }) => {
  const imagePath = '/' + card.Card.replace(/\\/g, '/');

  const renderSpecialBadges = (special) => {
    if (!special) return null;
    const badges = [];
    
    if (special.delta) {
      badges.push(<span key="δ" className="card-badge-delta">δ</span>);
    }
    
    if (special['LV. X']) {
      badges.push(
        <span key="Lv. X" className="card-badge-lvx">
          LV. <span className="card-badge-lvx-x">X</span>
        </span>
      );
    }
    
    if (special.ex) {
      badges.push(
        <img 
          key="ex" 
          src="/badges/ex_lower.png" 
          alt="ex" 
          className="card-badge-ex" 
        />
      );
    }

    if (special.EX) {
      badges.push(
        <img 
          key="EX" 
          src="/badges/ex_upper.png" 
          alt="EX" 
          className="card-badge-ex" 
        />
      );
    }

    if (special.V) {
      badges.push(
        <img 
          key="v" 
          src="/badges/v.png" 
          alt="V" 
          className="card-badge-v"
        />
      );
    }

    if (special.paradox === "Future") {
      badges.push(
        <img 
          key="paradox" 
          src="/badges/paradox_future.png" 
          alt="Future Paradox" 
          className="card-badge-paradox" 
        />
      );
    }
    
    return badges;
  };

  const renderSpecialInfo = (special) => {
    if (!special) return null;
    const info = [];

    if (special["Trainer Pokemon"]) {
      info.push(
        <div key="trainer" className="card-special-info">
          <span className="card-special-label">Trainer Pokemon:</span>
          <span>{special["Trainer Pokemon"]}</span>
        </div>
      );
    }

    if (special.Form) {
      info.push(
        <div key="form" className="card-special-info">
          <span className="card-special-label">Form:</span>
          <span>{special.Form}</span>
        </div>
      );
    }

    return info.length > 0 ? (
      <div className="card-special-section">
        {info}
      </div>
    ) : null;
  };

  if (type === 'pokemon') {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <h2 className="card-title">
              {card.Name}
              {card.Special && (
                <span className="card-badges">
                  {renderSpecialBadges(card.Special)}
                </span>
              )}
            </h2>
            <span className="card-number">
              #{card.Number.toString().padStart(4, '0')}
            </span>
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
            <span className="card-code">
              {card.Code}
            </span>
          </div>
          
          {renderSpecialInfo(card.Special)}
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
      Language: PropTypes.oneOf(['EN', 'JP']).isRequired,
      Special: PropTypes.shape({
        ex: PropTypes.bool,
        EX: PropTypes.bool,
        'LV. X': PropTypes.bool,
        V: PropTypes.bool,
        delta: PropTypes.bool,
        paradox: PropTypes.string,
        'Trainer Pokemon': PropTypes.string,
        Form: PropTypes.string
      })
    }),
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Card: PropTypes.string.isRequired,
      Set: PropTypes.string.isRequired,
      Quantity: PropTypes.number.isRequired,
      Code: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Language: PropTypes.oneOf(['EN', 'JP']).isRequired,
    }),
  ]).isRequired,
  type: PropTypes.oneOf(['pokemon', 'other']).isRequired,
};

export default CardItem;