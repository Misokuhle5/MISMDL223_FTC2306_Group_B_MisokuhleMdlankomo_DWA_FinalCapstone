import React, { useState } from 'react';
import '../css/AudioPlayer.css'; // Import your custom CSS for the audio player

const AudioPlayer = ({ currentEpisode, episodeList, onEpisodeSelect }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState(currentEpisode.file);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleEpisodeSelect = (selectedEpisode) => {
        onEpisodeSelect(selectedEpisode);
        setAudioSrc(selectedEpisode.file);
        setIsPlaying(true);
    };

    return (
        <div className="audio-player-container">
            <div className="audio-controls">
                <div className="play-pause-button" onClick={isPlaying ? handlePause : handlePlay}>
                    <img
                        src={isPlaying ? '/path/to/pause-image.png' : '/path/to/play-image.png'}
                        alt={isPlaying ? 'Pause' : 'Play'}
                        style={{ width: '30px', height: '30px' }}
                    />
                </div>
                <div className="audio-info">
                    {currentEpisode && (
                        <div className="current-episode-info">
                            <p className="episode-title">{currentEpisode.title}</p>
                            <p className="episode-description">{currentEpisode.description}</p>
                        </div>
                    )}
                    <audio controls autoPlay={isPlaying}>
                        <source src={audioSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            <div className="episode-list">
                <h3>Episodes</h3>
                <ul>
                    {episodeList.map((episode) => (
                        <li key={episode.id} onClick={() => handleEpisodeSelect(episode)}>
                            {episode.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AudioPlayer;
