import "./Player.css";
import { useState, useEffect, useRef } from "react";

export default function Player({ videoId, onPrev, onNext }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const iframeRef = useRef(null);
    const playerRef = useRef(null);

    // Load YouTube IFrame API and initialize player
    useEffect(() => {
        // Load YouTube API script
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            if (iframeRef.current && videoId && !playerRef.current) {
                playerRef.current = new window.YT.Player(iframeRef.current, {
                    videoId: videoId,
                    events: {
                        onStateChange: (event) => {
                            if (event.data === window.YT.PlayerState.PLAYING) {
                                setIsPlaying(true);
                                // Get duration when video starts playing
                                const dur = event.target.getDuration();
                                if (dur > 0) {
                                    setDuration(dur);
                                }
                            } else {
                                setIsPlaying(false);
                            }
                        },
                        onReady: (event) => {
                            // Set duration when player is ready
                            const dur = event.target.getDuration();
                            setDuration(dur);
                        },
                    },
                });
            }
        };
    }, [videoId]);

    // Update current time while playing
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                try {
                    setCurrentTime(playerRef.current.getCurrentTime());
                } catch (e) {
                    // Silent catch
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Load new video when videoId changes
    useEffect(() => {
        if (playerRef.current && videoId) {
            playerRef.current.loadVideoById(videoId);
            setCurrentTime(0);
            setIsPlaying(false);
            setDuration(0); // Reset duration while loading new video
        }
    }, [videoId]);

    const togglePlayPause = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handlePrev = () => {
        if (onPrev) {
            onPrev();
        }
    };

    const handleNext = () => {
        if (onNext) {
            onNext();
        }
    };

    const handleSeek = (e) => {
        if (!playerRef.current) return;

        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * duration;

        playerRef.current.seekTo(newTime, true);
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds) || !seconds) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const progressPercentage =
        duration > 0 ? (currentTime / duration) * 100 : 0;

    if (!videoId) {
        return <div className='player'>Select a video to play</div>;
    }

    return (
        <div className='player'>
            {/* YouTube Player Container */}
            <div
                ref={iframeRef}
                id='youtube-player'
                style={{ display: "none" }}
            ></div>

            <div className='buttons'>
                <svg
                    className='prev btn'
                    onClick={handlePrev}
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                    style={{ cursor: "pointer" }}
                >
                    <path
                        d='M3.75 8.43262C3.4169 8.24014 3.4169 7.75987 3.75 7.56738L12.75 2.3711C13.0833 2.17867 13.4999 2.41889 13.5 2.80371L13.5 13.1963C13.4999 13.5811 13.0833 13.8213 12.75 13.6289L3.75 8.43262Z'
                        fill='white'
                        stroke='white'
                    />
                    <line
                        x1='1.7998'
                        y1='14.2'
                        x2='1.79981'
                        y2='2.59995'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </svg>
                <svg
                    className='pause-play btn'
                    onClick={togglePlayPause}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='25'
                    viewBox='0 0 24 25'
                    fill='none'
                    style={{ cursor: "pointer" }}
                >
                    {isPlaying ? (
                        <>
                            <rect
                                x='6'
                                y='4'
                                width='4'
                                height='17'
                                fill='white'
                            />
                            <rect
                                x='14'
                                y='4'
                                width='4'
                                height='17'
                                fill='white'
                            />
                        </>
                    ) : (
                        <path
                            d='M22.5751 11.643C23.2212 12.0316 23.2212 12.9684 22.5751 13.357L7.51538 22.414C6.84888 22.8148 6 22.3348 6 21.557L6 3.443C6 2.66525 6.84887 2.1852 7.51538 2.58604L22.5751 11.643Z'
                            fill='white'
                        />
                    )}
                </svg>
                <svg
                    className='next btn'
                    onClick={handleNext}
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='15'
                    viewBox='0 0 18 15'
                    fill='none'
                    style={{ cursor: "pointer" }}
                >
                    <path
                        d='M14.1377 7.06055C14.4864 7.24974 14.4864 7.75026 14.1377 7.93945L5.23828 12.7568C4.90513 12.9372 4.5 12.6952 4.5 12.3164L4.5 2.68359C4.5 2.30478 4.90514 2.06284 5.23828 2.24316L14.1377 7.06055Z'
                        fill='white'
                        stroke='white'
                    />
                    <line
                        x1='16.2002'
                        y1='1.75'
                        x2='16.2002'
                        y2='12.5'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </svg>
            </div>
            <div className='bar'>
                <span>{formatTime(currentTime)}</span>
                <div
                    className='slider'
                    onClick={handleSeek}
                    style={{ cursor: "pointer", position: "relative" }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='345'
                        height='2'
                        viewBox='0 0 345 2'
                        fill='none'
                    >
                        <path d='M0 1H345' stroke='rgba(255, 255, 255, 0.3)' />
                    </svg>
                    <div
                        className='progress'
                        style={{
                            width: `${progressPercentage}%`,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "2px",
                            background: "rgba(255, 255, 255, 0.8)",
                            pointerEvents: "none",
                        }}
                    ></div>
                </div>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
