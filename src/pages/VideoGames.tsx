// VideoGames.tsx

import React, { useEffect, useState } from 'react';
import './VideoGames.css';
import { VideoGame } from '../types';
import { getVideoGames } from '../services/dataService';

// Import placeholder images (you can replace these with actual game images)
import rdr2Image from '../images/rdr2.jpeg'; // Placeholder - replace with actual RDR2 image
import witcher3Image from '../images/witcher.jpeg'; // Placeholder - replace with actual Witcher 3 image
import cs2Image from '../images/cs2.jpeg'; // Placeholder - replace with actual CS2 image
import skyrimImage from '../images/skyrim.jpeg'; // Placeholder - replace with actual Skyrim image
import farcry5Image from '../images/farCry.jpeg'; // Placeholder - replace with actual Far Cry 5 image

const VideoGames: React.FC = () => {
  const [videoGames, setVideoGames] = useState<VideoGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideoGames() {
      try {
        const data = await getVideoGames();
        
        // Map the imported images to the games
        const imageMap: { [key: string]: string } = {
          'Red Dead Redemption 2': rdr2Image,
          'The Witcher 3: Wild Hunt': witcher3Image,
          'Counter-Strike 2': cs2Image,
          'The Elder Scrolls V: Skyrim': skyrimImage,
          'Far Cry 5': farcry5Image
        };
        
        const gamesWithImages = data.map(game => ({
          ...game,
          imgSrc: imageMap[game.title] || rdr2Image // fallback image
        }));
        
        setVideoGames(gamesWithImages);
      } catch (error) {
        console.error('Error fetching video games:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideoGames();
  }, []);

  if (loading) {
    return <div className="video-games-container">Loading...</div>;
  }

  return (
    <div className="video-games-container">
      <h2 className="video-games-title">🎮 Games That Define My Gaming Journey</h2>
      <p className="video-games-intro">These are some of my favorite games that have shaped my gaming experience and storytelling appreciation.</p>
      <div className="games-grid">
        {videoGames.map((game, index) => (
          <div key={index} className="game-card" style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}>
            <img src={game.imgSrc} alt={game.title} className="game-cover" />
            <div className="game-info">
              <h3 className="game-title">{game.title}</h3>
              <h4 className="game-developer">{game.developer}</h4>
              <div className="game-meta">
                <span className="game-genre">{game.genre}</span>
                <span className="game-year">({game.releaseYear})</span>
                <span className="game-rating">⭐ {game.rating}</span>
              </div>
              <p className="game-platform">Available on: {game.platform}</p>
              <p className="game-description">{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGames;
