import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';

const CARDS_PER_PAGE = 12; // Reduced batch size for smoother loading

const CardGrid = ({ pokemonCards, otherCards, searchConfig, filterType }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('pokemon');
  const loaderRef = useRef(null);
  const timeoutRef = useRef(null);

  // Detect when images are in viewport
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe all lazy-loaded images
    document.querySelectorAll('.card-image img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    return () => imageObserver.disconnect();
  }, [visibleCards]);

  // Infinite scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          // Add debounce to prevent multiple rapid loads
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            loadMoreCards();
          }, 300);
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasMore, loading, page]);

  useEffect(() => {
    setPage(1);
    setVisibleCards([]);
    setHasMore(true);
    const cards = activeTab === 'pokemon' ? 
      sortByPokedexNumber(safeFilter(pokemonCards, searchConfig.term)) :
      sortOtherCards(safeFilter(otherCards?.filter(card => filterType === 'all' || card.Type === filterType), searchConfig.term));
    
    loadMoreCards(true, cards);
  }, [searchConfig.term, filterType, activeTab]);

  const loadMoreCards = (reset = false, cardsToLoad) => {
    setLoading(true);
    const currentPage = reset ? 1 : page;
    const cards = cardsToLoad || (activeTab === 'pokemon' ? 
      sortByPokedexNumber(safeFilter(pokemonCards, searchConfig.term)) :
      sortOtherCards(safeFilter(otherCards?.filter(card => filterType === 'all' || card.Type === filterType), searchConfig.term))
    );
    
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const end = start + CARDS_PER_PAGE;
    const newCards = cards.slice(start, end);

    // Artificial delay to prevent rapid loading
    setTimeout(() => {
      setVisibleCards(prev => reset ? newCards : [...prev, ...newCards]);
      setHasMore(end < cards.length);
      setPage(currentPage + 1);
      setLoading(false);
    }, 300);
  };

  const normalizeSearch = (text) => {
    if (text === null || text === undefined) return '';
    return text.toString().toLowerCase();
  };

  const padPokedexNumber = (number) => {
    if (!number) return '';
    return number.toString().padStart(4, '0');
  };

  const filterCards = (cards, searchTerm) => {
    if (!Array.isArray(cards)) return [];
    if (!searchTerm) return cards;
    
    const normalizedTerm = normalizeSearch(searchTerm);

    return cards.filter(card => {
      try {
        const searchableFields = [
          card.Name,
          card.Code,
          card.Set,
          card.Number
        ].map(field => normalizeSearch(field));

        if (card.Number) {
          searchableFields.push(padPokedexNumber(card.Number));
        }

        if (card.Special) {
          if (card.Special.delta) searchableFields.push('delta');
          if (card.Special['LV. X']) searchableFields.push('lv x');
          if (card.Special.ex) searchableFields.push('ex');
          if (card.Special.EX) searchableFields.push('ex');
          if (card.Special.V) searchableFields.push('v');
          if (card.Special.paradox) searchableFields.push(card.Special.paradox.toLowerCase());
          if (card.Special['Trainer Pokemon']) searchableFields.push(normalizeSearch(card.Special['Trainer Pokemon']));
          if (card.Special.Form) searchableFields.push(normalizeSearch(card.Special.Form));
        }

        return searchableFields.some(field => field.includes(normalizedTerm));
      } catch (error) {
        console.error('Error filtering card:', card, error);
        return false;
      }
    });
  };

  const safeFilter = (cards, term) => {
    try {
      return filterCards(cards, term);
    } catch (error) {
      console.error('Error in filtering:', error);
      return [];
    }
  };

  const sortByPokedexNumber = (cards) => {
    return [...cards].sort((a, b) => {
      const numA = parseInt(a.Number) || Infinity;
      const numB = parseInt(b.Number) || Infinity;
      return numA - numB;
    });
  };

  const sortOtherCards = (cards) => {
    return [...cards].sort((a, b) => {
      if (a.Type < b.Type) return -1;
      if (a.Type > b.Type) return 1;
      return a.Name.localeCompare(b.Name);
    });
  };

  const filteredPokemon = sortByPokedexNumber(
    safeFilter(pokemonCards, searchConfig.term)
  );

  const filteredOther = sortOtherCards(
    safeFilter(
      otherCards?.filter(card => filterType === 'all' || card.Type === filterType),
      searchConfig.term
    )
  );

  return (
    <div>
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

      <div className="card-grid">
        {visibleCards.map((card, index) => (
          <CardItem 
            key={`${card.Code}-${index}`}
            card={card}
            type={activeTab}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="loader">
          {loading ? (
            <div className="loading-indicator">
              Loading more cards...
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

CardGrid.propTypes = {
  pokemonCards: PropTypes.arrayOf(PropTypes.shape({
    Code: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Number: PropTypes.string,
    cloudinary_id: PropTypes.string,
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
  })).isRequired,
  otherCards: PropTypes.arrayOf(PropTypes.shape({
    Code: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired
  })).isRequired,
  searchConfig: PropTypes.shape({
    term: PropTypes.string
  }).isRequired,
  filterType: PropTypes.string.isRequired
};

export default CardGrid;