export const normalizeCardData = (data) => {
    const normalizeCard = (card) => ({
      ...card,
      Number: card.Number?.toString() || '',
      Language: card.Language || 'EN' // Default to 'EN' if not specified
    });
  
    return {
      pokemon: Array.isArray(data.pokemon) ? data.pokemon.map(normalizeCard) : [],
      other: Array.isArray(data.other) ? data.other.map(normalizeCard) : [],
    };
  };
  
  export const normalizePokedexData = (data) => {
    return {
      pokedex: Array.isArray(data.pokedex) 
        ? data.pokedex.map(pokemon => ({
            ...pokemon,
            Number: pokemon.Number?.toString() || ''
          }))
        : []
    };
  };