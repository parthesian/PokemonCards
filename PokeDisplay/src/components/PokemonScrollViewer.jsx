import { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const PokemonScrollViewer = ({ pokedexData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef(null);
  
  const calculateIndexFromPosition = useCallback((clientX) => {
    const rect = scrollbarRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = position / rect.width;
    let index = Math.round(percentage * (pokedexData.length - 1));
    
    if (index < 0) index = 0;
    if (index >= pokedexData.length) index = pokedexData.length - 1;
    
    return index;
  }, [pokedexData.length]);
  
  const getAdjacentIndices = (current, total, count) => {
    const indices = [];
    for (let i = -count; i <= count; i++) {
      let index = current + i;
      if (index < 0) index = total + index;
      if (index >= total) index = index - total;
      indices.push(index);
    }
    return indices;
  };

  const handleMouseDown = (e) => {
    if (e.target === scrollbarRef.current) {
      const newIndex = calculateIndexFromPosition(e.clientX);
      setCurrentIndex(newIndex);
    }
    setIsDragging(true);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => 
          prev > 0 ? prev - 1 : pokedexData.length - 1
        );
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => 
          prev < pokedexData.length - 1 ? prev + 1 : 0
        );
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        const newIndex = calculateIndexFromPosition(e.clientX);
        setCurrentIndex(newIndex);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, pokedexData.length, calculateIndexFromPosition]);

  const visibleIndices = getAdjacentIndices(currentIndex, pokedexData.length, 10);
  const scrollPosition = (currentIndex / (pokedexData.length - 1)) * 100;

  return (
    <div style={{ marginBottom: '2rem', marginTop:'2rem' }}>
      <div className="stat-card" style={{ 
        padding: '2rem 1rem',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            transition: 'transform 0.3s ease'
          }}>
            {visibleIndices.map((index) => {
              const pokemon = pokedexData[index];
              const isCurrent = index === currentIndex;
              
              return (
                <div 
                  key={pokemon.Number}
                  style={{ 
                    textAlign: 'center',
                    transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    margin: '0 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: isCurrent ? '120px' : '80px',
                    height: isCurrent ? '90px' : '75px'
                  }}
                >
                  <div style={{ 
                    fontSize: isCurrent ? '1.5rem' : '1rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    color: pokemon.Collected ? '#ff0000' : 'var(--text-primary)'
                  }}>
                    #{pokemon.Number}
                  </div>
                  <div style={{
                    fontSize: isCurrent ? '1rem' : '0.8rem',
                    whiteSpace: isCurrent ? 'normal' : 'nowrap',
                    overflow: isCurrent ? 'visible' : 'hidden',
                    textOverflow: isCurrent ? 'clip' : 'ellipsis',
                    maxWidth: '100%',
                    minHeight: isCurrent ? '2em' : '1.5em',
                    lineHeight: '1.5em'
                  }}>
                    {pokemon.Collected ? pokemon.Name : '?'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Scrollbar */}
        <div 
          ref={scrollbarRef}
          style={{
            width: 'calc(100% - 2rem)',
            height: '20px',
            background: 'var(--background-color)',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            margin: '0 1rem'
          }}
          onMouseDown={handleMouseDown}
        >
          <div 
            style={{
              position: 'absolute',
              left: `${scrollPosition}%`,
              transform: 'translateX(-50%)',
              width: '40px',
              height: '100%',
              background: 'var(--primary-color)',
              borderRadius: '10px',
              transition: isDragging ? 'none' : 'left 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

PokemonScrollViewer.propTypes = {
  pokedexData: PropTypes.arrayOf(PropTypes.shape({
    Number: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Collected: PropTypes.bool.isRequired
  })).isRequired
};

export default PokemonScrollViewer;