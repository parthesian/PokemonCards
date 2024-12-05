import PropTypes from 'prop-types';
import CardItem from './CardItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CardGrid = ({ pokemonCards, otherCards, searchTerm, filterType }) => {
  // Filter cards based on search term and type
  const filteredPokemon = pokemonCards.filter(card => 
    card.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOther = otherCards.filter(card => 
    card.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || card.Type === filterType)
  );

  return (
    <Tabs defaultValue="pokemon" className="w-full">
      <TabsList>
        <TabsTrigger value="pokemon">Pokemon ({filteredPokemon.length})</TabsTrigger>
        <TabsTrigger value="other">Other Cards ({filteredOther.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pokemon">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredPokemon.map(card => (
            <CardItem key={card.Code} card={card} type="pokemon" />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="other">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredOther.map(card => (
            <CardItem key={card.Code} card={card} type="other" />
          ))}
        </div>
      </TabsContent>
    </Tabs>
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
  searchTerm: PropTypes.string.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default CardGrid;