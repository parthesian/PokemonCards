import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';

const CardItem = ({ card, type }) => {
  // Convert Windows backslashes to forward slashes and ensure path starts with /
  const imagePath = '/' + card.Card.replace(/\\/g, '/');

  if (type === 'pokemon') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="font-bold">#{card.Number}</span>
            <h2 className="text-xl font-semibold">{card.Name}</h2>
          </div>
          
          <div className="relative aspect-[2.5/3.5] mb-4">
            <img
              src={imagePath}
              alt={`${card.Name} card`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Set:</span>
              <span>{card.Set}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{card.Quantity}</span>
            </div>
            
            {card.Special && (
              <div className="flex justify-between">
                <span className="font-medium">Special:</span>
                <span>{card.Special}</span>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              Code: {card.Code}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-500">{card.Type}</span>
          <h2 className="text-xl font-semibold">{card.Name}</h2>
        </div>
        
        <div className="relative aspect-[2.5/3.5] mb-4">
          <img
            src={imagePath}
            alt={`${card.Name} card`}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Set:</span>
            <span>{card.Set}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span>{card.Quantity}</span>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Code: {card.Code}
          </div>
        </div>
      </CardContent>
    </Card>
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