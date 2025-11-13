import { useEffect, useRef, useState } from "react";
import "./Player.css";

export default function Player({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: '',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };
    }, []);

    useEffect(() => {
        if (playerRef.current && currentTrack) {
            const videoId = currentTrack.snippet?.resourceId?.videoId || currentTrack.id?.videoId;
            if (videoId) {
                playerRef.current.loadVideoById(videoId);
                if (isPlaying) {
                    playerRef.current.playVideo();
                }
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        if (playerRef.current && playerRef.current.playVideo) {
            if (isPlaying) {
                playerRef.current.playVideo();
            } else {
                playerRef.current.pauseVideo();
            }
        }
    }, [isPlaying]);

    const onPlayerReady = (event) => {
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setDuration(event.target.getDuration());
            updateProgress();
        } else if (event.data === window.YT.PlayerState.ENDED) {
            onNext();
        }
    };

    const updateProgress = () => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
            const current = playerRef.current.getCurrentTime();
            setCurrentTime(current);
            if (playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
                requestAnimationFrame(updateProgress);
            }
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e) => {
        if (playerRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const newTime = percentage * duration;
            playerRef.current.seekTo(newTime);
            setCurrentTime(newTime);
        }
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className='player'>
            <div id="youtube-player" style={{ display: 'none' }}></div>
            <div className='buttons'>
                <svg
                    className='prev btn'
                    onClick={onPrev}
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                    style={{ cursor: 'pointer' }}
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
                    onClick={onPlayPause}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='25'
                    viewBox='0 0 24 25'
                    fill='none'
                    style={{ cursor: 'pointer' }}
                >
                    {isPlaying ? (
                        <>
                            <rect x='6' y='3' width='4' height='19' fill='white' />
                            <rect x='14' y='3' width='4' height='19' fill='white' />
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
                    onClick={onNext}
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='15'
                    viewBox='0 0 18 15'
                    fill='none'
                    style={{ cursor: 'pointer' }}
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
                <div className='slider' onClick={handleSeek} style={{ cursor: 'pointer' }}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='345'
                        height='2'
                        viewBox='0 0 345 2'
                        fill='none'
                    >
                        <path d='M0 1H345' stroke='white' />
                    </svg>
                    <div className='progress' style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
