import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CollectionStats = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Pokedex Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.completionRate}%</div>
          <Progress value={summary.completionRate} className="mt-2" />
          <div className="text-sm text-gray-500 mt-1">
            {summary.collectedPokemon} / {summary.totalPokemon}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Pokemon Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalCards}</div>
          <div className="text-sm text-gray-500">
            {summary.uniqueCards} unique cards
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Other Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalOtherCards}</div>
          <div className="text-sm text-gray-500">
            {summary.otherCards} unique cards
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Total Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary.totalCards + summary.totalOtherCards}
          </div>
          <div className="text-sm text-gray-500">
            {summary.uniqueCards + summary.otherCards} unique cards
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

CollectionStats.propTypes = {
  summary: PropTypes.shape({
    completionRate: PropTypes.number.isRequired,
    collectedPokemon: PropTypes.number.isRequired,
    totalPokemon: PropTypes.number.isRequired,
    totalCards: PropTypes.number.isRequired,
    uniqueCards: PropTypes.number.isRequired,
    totalOtherCards: PropTypes.number.isRequired,
    otherCards: PropTypes.number.isRequired
  }).isRequired
};

export default CollectionStats;