import { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import regionData from '../data/region_to_dex.json';

const PokemonScrollViewer = ({ pokedexData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef(null);
  
  const getCurrentRegion = useCallback((number) => {
    const numericNumber = parseInt(number);
    for (const [region, data] of Object.entries(regionData)) {
      if (numericNumber >= data.start && numericNumber <= data.end) {
        return { region, ...data };
      }
    }
    return null;
  }, []);

  const getAdjacentRegions = useCallback((currentNumber) => {
    const regions = Object.entries(regionData);
    const currentRegion = getCurrentRegion(currentNumber);
    const currentIndex = regions.findIndex(([region]) => region === currentRegion?.region);
    
    return {
      previous: currentIndex > 0 ? {
        name: regions[currentIndex - 1][0],
        ...regions[currentIndex - 1][1]
      } : null,
      current: currentRegion ? {
        name: currentRegion.region,
        ...currentRegion
      } : null,
      next: currentIndex < regions.length - 1 ? {
        name: regions[currentIndex + 1][0],
        ...regions[currentIndex + 1][1]
      } : null
    };
  }, [getCurrentRegion]);

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
  const regions = getAdjacentRegions(pokedexData[currentIndex].Number);

  return (
    <div style={{ marginBottom: '2rem', marginTop:'2rem' }}>
      <div className="stat-card" style={{ 
        padding: '2rem 1rem',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          width: '32px',
          height: '32px',
          backgroundImage: 'url(/PokedexIcon.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }} />

          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.875rem'
          }}>
          {regions.previous && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              flexDirection: 'column'
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                #{regions.previous.start}-{regions.previous.end}
              </div>
              <div>← {regions.previous.name}</div>
            </div>
          )}
          <div style={{ 
            fontWeight: 'bold',
            color: 'var(--primary-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1rem' }}>
              {regions.current?.name}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              #{regions.current?.start}-{regions.current?.end}
            </div>
          </div>
          {regions.next && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              flexDirection: 'column'
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                #{regions.next.start}-{regions.next.end}
              </div>
              <div>{regions.next.name} →</div>
            </div>
          )}
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          marginTop: '2rem'
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