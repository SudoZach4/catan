import { useEffect, useState } from 'react';
import './CardReveal.css';

const DEV_CARD_INFO = {
  knight: {
    name: 'Knight',
    icon: '⚔️',
    description: 'Move the robber to a new hex and steal a resource from an opponent with a building adjacent to that hex.',
    color: '#8b4513',
    bgGradient: 'linear-gradient(135deg, #654321 0%, #8b4513 50%, #a0522d 100%)'
  },
  victoryPoint: {
    name: 'Victory Point',
    icon: '🏆',
    description: 'Worth 1 Victory Point! This is kept SECRET from other players until you win. Only you can see this VP.',
    color: '#ffd700',
    bgGradient: 'linear-gradient(135deg, #b8860b 0%, #ffd700 50%, #ffec8b 100%)'
  },
  roadBuilding: {
    name: 'Road Building',
    icon: '🛤️',
    description: 'Build 2 roads immediately for free, following normal placement rules.',
    color: '#2e8b57',
    bgGradient: 'linear-gradient(135deg, #1e5a37 0%, #2e8b57 50%, #3cb371 100%)'
  },
  yearOfPlenty: {
    name: 'Year of Plenty',
    icon: '🌈',
    description: 'Take any 2 resource cards from the bank. They can be 2 of the same or different resources.',
    color: '#4169e1',
    bgGradient: 'linear-gradient(135deg, #2a4494 0%, #4169e1 50%, #6495ed 100%)'
  },
  monopoly: {
    name: 'Monopoly',
    icon: '💰',
    description: 'Name 1 resource. All other players must give you ALL of their cards of that type.',
    color: '#9932cc',
    bgGradient: 'linear-gradient(135deg, #6a1b9a 0%, #9932cc 50%, #ba55d3 100%)'
  },
  resourceBoost: {
    name: 'Resource Boost',
    icon: '✨',
    description: 'Choose 1 resource and gain 2 of it from the bank.',
    color: '#4ecdc4',
    bgGradient: 'linear-gradient(135deg, #1b7f7a 0%, #4ecdc4 50%, #8fe3dc 100%)'
  },
  tradingPost: {
    name: 'Trading Post',
    icon: '🏪',
    description: 'Gain 1 brick and 1 lumber to strengthen your settlement network.',
    color: '#f7b267',
    bgGradient: 'linear-gradient(135deg, #c96a1a 0%, #f7b267 50%, #ffd9a0 100%)'
  }
};

function CardReveal({ cardType, onClose }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const cardInfo = DEV_CARD_INFO[cardType];
  
  useEffect(() => {
    // Start flip animation after a short delay
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);
    
    // End animation state
    const animTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
    
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(animTimer);
    };
  }, []);
  
  if (!cardInfo) return null;
  
  return (
    <div className="card-reveal-overlay" onClick={onClose}>
      <div className="card-reveal-container">
        <div className={`card-reveal ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}>
          {/* Card Back */}
          <div className="card-face card-back">
            <div className="card-back-design">
              <div className="card-back-pattern">
                <span className="card-back-icon">🎴</span>
              </div>
              <div className="card-back-text">Development Card</div>
            </div>
          </div>
          
          {/* Card Front */}
          <div 
            className="card-face card-front"
            style={{ background: cardInfo.bgGradient }}
          >
            <div className="card-border">
              <div className="card-header">
                <span className="card-icon-large">{cardInfo.icon}</span>
                <h2 className="card-title">{cardInfo.name}</h2>
              </div>
              
              <div className="card-body">
                <div className="card-art">
                  <span className="card-art-icon">{cardInfo.icon}</span>
                </div>
                <p className="card-description">{cardInfo.description}</p>
              </div>
              
              <div className="card-footer">
                <span className="card-type">Development Card</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="card-reveal-hint">Click anywhere to close</p>
      </div>
    </div>
  );
}

export default CardReveal;

