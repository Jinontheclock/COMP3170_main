import { useState, useEffect } from "react";
import youtubeService from "../services/youtubeService";
import "./PlaylistManager.css";

const PlaylistManager = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    useEffect(() => {
        const savedPlaylist = localStorage.getItem("myPlaylist");
        if (savedPlaylist) {
            setPlaylist(JSON.parse(savedPlaylist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("myPlaylist", JSON.stringify(playlist));
        // Dispatch event to notify other components of changes
        window.dispatchEvent(new Event("playlistUpdated"));
    }, [playlist]);

    const removeFromPlaylist = (videoId) => {
        setPlaylist(
            playlist.filter((item) => {
                const id = item.id?.videoId || item.id;
                return id !== videoId;
            })
        );

        const currentVideoId =
            currentlyPlaying?.id?.videoId || currentlyPlaying?.id;
        if (currentVideoId === videoId) {
            setCurrentlyPlaying(null);
        }
    };

    const playVideo = (video) => {
        setCurrentlyPlaying(video);
    };

    const clearPlaylist = () => {
        if (
            window.confirm(
                "Are you sure you want to clear the entire playlist?"
            )
        ) {
            setPlaylist([]);
            setCurrentlyPlaying(null);
        }
    };

    return (
        <div className='playlist-manager'>
            <div className='playlist-header'>
                <h1>My Playlist</h1>
            </div>

            {currentlyPlaying && (
                <div className='player-section'>
                    <div className='player-header'>
                        <h3>Now Playing</h3>
                        <button
                            onClick={() => setCurrentlyPlaying(null)}
                            className='close-player'
                        >
                            ✕
                        </button>
                    </div>
                    <div className='video-player'>
                        <iframe
                            src={youtubeService.getEmbedUrl(
                                currentlyPlaying.id?.videoId ||
                                    currentlyPlaying.id
                            )}
                            title={currentlyPlaying.snippet.title}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className='player-info'>
                        <h4>{currentlyPlaying.snippet.title}</h4>
                        <p>{currentlyPlaying.snippet.channelTitle}</p>
                    </div>
                </div>
            )}

            <div className='playlist-section'>
                <div className='playlist-section-header'>
                    <h2>Playlist ({playlist.length} tracks)</h2>
                    {playlist.length > 0 && (
                        <button
                            onClick={clearPlaylist}
                            className='clear-all-button'
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {playlist.length === 0 ? (
                    <div className='empty-playlist'>
                        <p>Your playlist is empty.</p>
                        <p>Search and add music to your playlist!</p>
                    </div>
                ) : (
                    <div className='playlist-grid'>
                        {playlist.map((video, index) => {
                            const videoId = video.id?.videoId || video.id;
                            return (
                                <div key={videoId} className='playlist-item'>
                                    <div className='item-number'>
                                        {index + 1}
                                    </div>
                                    <div className='video-thumbnail'>
                                        <img
                                            src={youtubeService.getThumbnailUrl(
                                                video.snippet.thumbnails
                                            )}
                                            alt={video.snippet.title}
                                        />
                                    </div>
                                    <div className='video-info'>
                                        <h4 className='video-title'>
                                            {video.snippet.title}
                                        </h4>
                                        <p className='video-channel'>
                                            {video.snippet.channelTitle}
                                        </p>
                                    </div>
                                    <div className='video-actions'>
                                        <button
                                            onClick={() => playVideo(video)}
                                            className='play-button'
                                            title='Play'
                                        >
                                            ▶
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeFromPlaylist(videoId)
                                            }
                                            className='remove-button'
                                            title='Remove from playlist'
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistManager;
