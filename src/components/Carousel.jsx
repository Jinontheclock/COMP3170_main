import "./Carousel.css";
import { useState, useEffect } from "react";
import youtubeService from "../services/youtubeService";
import Player from "./Player";

const Carousel = ({ isEditing = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playList, setPlaylist] = useState(
        "PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx"
    );
    const [albumData, setAlbumData] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState(null);

    useEffect(() => {
        const fetchPlaylistItems = async () => {
            try {
                const data = await youtubeService.getPlaylistItems(playList);
                console.log("Playlist Items:", data);
                setAlbumData(data.items || []);
                // Auto-load first video
                if (data.items && data.items.length > 0) {
                    const firstVideoId =
                        data.items[0].snippet?.resourceId?.videoId;
                    if (firstVideoId) {
                        setCurrentVideoId(firstVideoId);
                    }
                }
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        fetchPlaylistItems();
    }, [playList]);

    const nextSlide = () => {
        const nextIndex =
            currentIndex === albumData.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (albumData[nextIndex]) {
            handlePlayVideo(albumData[nextIndex]);
        }
    };

    const prevSlide = () => {
        const prevIndex =
            currentIndex === 0 ? albumData.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        if (albumData[prevIndex]) {
            handlePlayVideo(albumData[prevIndex]);
        }
    };

    const getVisibleAlbums = () => {
        const visible = [];
        const total = albumData.length;

        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + total) % total;
            visible.push({
                ...albumData[index],
                position: i,
                isCenter: i === 0,
            });
        }

        return visible;
    };

    const visibleAlbums = getVisibleAlbums();
    const currentAlbum = albumData[currentIndex];

    if (albumData.length === 0) {
        return <div className='carousel-container'>Loading...</div>;
    }

    const handlePlayVideo = (album) => {
        const videoId = album.snippet?.resourceId?.videoId;
        if (videoId) {
            setCurrentVideoId(videoId);
        }
    };

    return (
        <div className='carousel-container'>
            <div className='carousel'>
                <div className='carousel-track'>
                    {visibleAlbums.map((album, index) => (
                        <div
                            key={album.id || index}
                            className={`album-cover ${
                                album.isCenter ? "center" : "side"
                            }`}
                            onClick={() => handlePlayVideo(album)}
                        >
                            {isEditing && (
                                <button className='album-delete'>X</button>
                            )}
                            {album.snippet?.thumbnails?.maxres?.url ? (
                                <img
                                    src={album.snippet.thumbnails.maxres.url}
                                    alt={album.snippet.title}
                                />
                            ) : (
                                <div className='placeholder-cover'>
                                    <span>
                                        {album.snippet?.title || "Untitled"}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className='work-stage'>
                <button className='carousel-btn prev-btn' onClick={prevSlide}>
                    ‹
                </button>
                <div className='current-track-info'>
                    <h3 className='track-title'>
                        {currentAlbum?.snippet?.title || "Unknown"}
                    </h3>
                    <p className='track-artist'>
                        {currentAlbum?.snippet?.videoOwnerChannelTitle ||
                            "Unknown Artist"}
                    </p>
                </div>
                <button className='carousel-btn next-btn' onClick={nextSlide}>
                    ›
                </button>
            </div>
            <Player
                videoId={currentVideoId}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
        </div>
    );
};

export default Carousel;
