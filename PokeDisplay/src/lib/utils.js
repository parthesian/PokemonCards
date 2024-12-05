import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine Tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format large numbers with commas
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Sort cards by various fields
export function sortCards(cards, sortBy = 'number') {
  return [...cards].sort((a, b) => {
    switch (sortBy) {
      case 'number':
        return (a.Number || 0) - (b.Number || 0);
      case 'name':
        return a.Name.localeCompare(b.Name);
      case 'set':
        return a.Set.localeCompare(b.Set);
      default:
        return 0;
    }
  });
}

// Filter cards by search term
export function filterCards(cards, searchTerm) {
  const term = searchTerm.toLowerCase();
  return cards.filter(card => 
    card.Name.toLowerCase().includes(term) ||
    card.Set.toLowerCase().includes(term) ||
    (card.Special && card.Special.toLowerCase().includes(term))
  );
}

// Calculate collection statistics
export function calculateStats(pokemon, other, pokedex) {
  const totalUniqueCards = pokemon.length + other.length;
  const totalCards = pokemon.reduce((sum, card) => sum + card.Quantity, 0) +
                    other.reduce((sum, card) => sum + card.Quantity, 0);
  const collectedPokemon = pokedex.filter(p => p.Collected).length;
  
  return {
    uniqueCards: totalUniqueCards,
    totalCards,
    completionRate: Math.round((collectedPokemon / pokedex.length) * 100),
    collectedPokemon,
    totalPokemon: pokedex.length
  };
}