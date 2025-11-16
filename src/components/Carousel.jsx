import "./Carousel.css";
import { useState, useEffect } from "react";
import youtubeService from "../services/youtubeService";
<<<<<<< HEAD
import Player from "./Player";

const Carousel = ({ isEditing = false }) => {
=======

const Carousel = ({ isEditing = false, onTrackSelect, onPlaylistLoad, currentIndex: externalIndex, setCurrentIndex: setExternalIndex }) => {
>>>>>>> Nov12
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playList, setPlaylist] = useState(
        "PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx"
    );
    const [albumData, setAlbumData] = useState([]);
<<<<<<< HEAD
    const [currentVideoId, setCurrentVideoId] = useState(null);
=======
>>>>>>> Nov12

    useEffect(() => {
        const fetchPlaylistItems = async () => {
            try {
                const data = await youtubeService.getPlaylistItems(playList);
                console.log("Playlist Items:", data);
<<<<<<< HEAD
                setAlbumData(data.items || []);
                // Auto-load first video
                if (data.items && data.items.length > 0) {
                    const firstVideoId =
                        data.items[0].snippet?.resourceId?.videoId;
                    if (firstVideoId) {
                        setCurrentVideoId(firstVideoId);
                    }
=======
                const items = data.items || [];
                setAlbumData(items);
                if (onPlaylistLoad) {
                    onPlaylistLoad(items);
>>>>>>> Nov12
                }
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        fetchPlaylistItems();
<<<<<<< HEAD
    }, [playList]);

    const nextSlide = () => {
        const nextIndex =
            currentIndex === albumData.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (albumData[nextIndex]) {
            handlePlayVideo(albumData[nextIndex]);
=======
    }, [playList, onPlaylistLoad]);

    useEffect(() => {
        if (externalIndex !== undefined && externalIndex !== currentIndex) {
            setCurrentIndex(externalIndex);
        }
    }, [externalIndex]);

    const nextSlide = () => {
        const newIndex = currentIndex === albumData.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        if (setExternalIndex) {
            setExternalIndex(newIndex);
        }
        if (onTrackSelect && albumData[newIndex]) {
            onTrackSelect(albumData[newIndex], newIndex);
>>>>>>> Nov12
        }
    };

    const prevSlide = () => {
<<<<<<< HEAD
        const prevIndex =
            currentIndex === 0 ? albumData.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        if (albumData[prevIndex]) {
            handlePlayVideo(albumData[prevIndex]);
=======
        const newIndex = currentIndex === 0 ? albumData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        if (setExternalIndex) {
            setExternalIndex(newIndex);
        }
        if (onTrackSelect && albumData[newIndex]) {
            onTrackSelect(albumData[newIndex], newIndex);
        }
    };

    const handleAlbumClick = (album, index) => {
        if (!isEditing) {
            const actualIndex = (currentIndex + index - 2 + albumData.length) % albumData.length;
            setCurrentIndex(actualIndex);
            if (setExternalIndex) {
                setExternalIndex(actualIndex);
            }
            if (onTrackSelect) {
                onTrackSelect(album, actualIndex);
            }
>>>>>>> Nov12
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

<<<<<<< HEAD
    const handlePlayVideo = (album) => {
        const videoId = album.snippet?.resourceId?.videoId;
        if (videoId) {
            setCurrentVideoId(videoId);
        }
    };

=======
>>>>>>> Nov12
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
<<<<<<< HEAD
                            onClick={() => handlePlayVideo(album)}
=======
                            onClick={() => handleAlbumClick(album, index)}
                            style={{ cursor: isEditing ? 'default' : 'pointer' }}
>>>>>>> Nov12
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
<<<<<<< HEAD
            <Player
                videoId={currentVideoId}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
=======
>>>>>>> Nov12
        </div>
    );
};

export default Carousel;
