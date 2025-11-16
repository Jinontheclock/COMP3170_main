import { useState, useEffect } from 'react';
import youtubeService from '../services/youtubeService';
<<<<<<< HEAD
=======
import PlaylistManager from './PlaylistManager';
>>>>>>> Nov12
import './Header.css';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchClosing, setIsSearchClosing] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
<<<<<<< HEAD
=======
    const [showPlaylistManager, setShowPlaylistManager] = useState(false);
>>>>>>> Nov12

    const toggleSearch = () => {
        if (isSearchOpen) {
            setIsSearchClosing(true);
            setTimeout(() => {
                setIsSearchOpen(false);
                setIsSearchClosing(false);
            }, 300);
        } else {
            setIsSearchOpen(true);
            if (isMenuOpen) {
                setIsMenuClosing(true);
                setTimeout(() => {
                    setIsMenuOpen(false);
                    setIsMenuClosing(false);
                }, 300);
            }
        }
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsMenuClosing(true);
<<<<<<< HEAD
=======
            setShowPlaylistManager(false);
>>>>>>> Nov12
            setTimeout(() => {
                setIsMenuOpen(false);
                setIsMenuClosing(false);
            }, 300);
        } else {
            setIsMenuOpen(true);
<<<<<<< HEAD
=======
            setShowPlaylistManager(false);
>>>>>>> Nov12
            if (isSearchOpen) {
                setIsSearchClosing(true);
                setTimeout(() => {
                    setIsSearchOpen(false);
                    setIsSearchClosing(false);
                }, 300);
            }
        }
    };

<<<<<<< HEAD
=======
    const openPlaylistManager = () => {
        setShowPlaylistManager(true);
    };

    const closePlaylistManager = () => {
        setShowPlaylistManager(false);
    };

>>>>>>> Nov12
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setSearchError(null);

        try {
            const results = await youtubeService.searchMusic(searchQuery, 10);
            setSearchResults(results.items || []);
        } catch (error) {
            setSearchError('Search failed. Please try again.');
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVideoSelect = (video) => {
        window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
    };

<<<<<<< HEAD
=======
    const addToPlaylist = (video, e) => {
        e.stopPropagation();
        
        const savedPlaylist = localStorage.getItem('myPlaylist');
        const playlist = savedPlaylist ? JSON.parse(savedPlaylist) : [];
        
        const exists = playlist.some(item => item.id.videoId === video.id.videoId);
        
        if (exists) {
            alert('This track is already in your playlist.');
            return;
        }
        
        playlist.push(video);
        localStorage.setItem('myPlaylist', JSON.stringify(playlist));
        alert('Added to playlist!');
    };

>>>>>>> Nov12
    return (
        <>
            <header className="header">
                <button className="icon-btn search-btn" onClick={toggleSearch}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
                <button className="icon-btn menu-btn" onClick={toggleMenu}>
                    ☰
                </button>
            </header>

            {isSearchOpen && (
                <div className={`sidebar search-sidebar frosted-backdrop ${isSearchClosing ? 'closing' : ''}`}>
                    <form onSubmit={handleSearch} className="search-container">
<<<<<<< HEAD
                        <span className="search-icon">🔍</span>
=======
>>>>>>> Nov12
                        <input 
                            type="text" 
                            placeholder="Search for music..." 
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    
                    {isLoading && (
                        <div className="loading-message">Searching...</div>
                    )}
                    
                    {searchError && (
                        <div className="error-message">{searchError}</div>
                    )}
                    
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((item, index) => (
                                <div key={item.id.videoId} className="search-item" onClick={() => handleVideoSelect(item)}>
                                    <img 
                                        src={item.snippet.thumbnails?.medium?.url || '/default-thumbnail.png'} 
                                        alt={item.snippet.title}
                                        className="album-placeholder"
                                    />
                                    <div className="track-info">
                                        <div className="song-name">{item.snippet.title}</div>
                                        <div className="artist-name">{item.snippet.channelTitle}</div>
                                    </div>
<<<<<<< HEAD
                                    <button 
                                        className="play-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVideoSelect(item);
                                        }}
                                    >
                                        ▶
                                    </button>
=======
                                    <div className="action-buttons">
                                        <button 
                                            className="add-to-playlist-btn"
                                            onClick={(e) => addToPlaylist(item, e)}
                                            title="Add to playlist"
                                        >
                                            ➕
                                        </button>
                                        <button 
                                            className="play-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVideoSelect(item);
                                            }}
                                        >
                                            ▶
                                        </button>
                                    </div>
>>>>>>> Nov12
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {searchResults.length === 0 && !isLoading && !searchError && (
                        <div className="empty-state">
                            <p>Search for your favorite music</p>
                        </div>
                    )}
                </div>
            )}

            {isMenuOpen && (
                <div className={`sidebar menu-sidebar frosted-backdrop ${isMenuClosing ? 'closing' : ''}`}>
<<<<<<< HEAD
                    <div className="menu-content">
                        <div className="menu-item">Profile</div>
                        <div className="menu-item bold">Bob Ross</div>
                        <div className="menu-item">Spotify Account</div>
                    </div>
=======
                    {showPlaylistManager ? (
                        <div className="playlist-manager-wrapper">
                            <button className="back-button" onClick={closePlaylistManager}>
                                ← Back
                            </button>
                            <PlaylistManager />
                        </div>
                    ) : (
                        <div className="menu-content">
                            <div className="menu-item">Profile</div>
                            <div className="menu-item bold">Bob Ross</div>
                            <div className="menu-item">Spotify Account</div>
                            <div className="menu-item playlist-menu" onClick={openPlaylistManager}>
                                Playlist Manager
                            </div>
                        </div>
                    )}
>>>>>>> Nov12
                </div>
            )}
        </>
    );
};

export default Header;
