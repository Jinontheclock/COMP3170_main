import { useState } from "react";
import Player from "./components/Player";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import "./App.css";

function App() {
    const [isEditing, setIsEditing] = useState(false);
<<<<<<< HEAD
=======
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
>>>>>>> Nov12

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

<<<<<<< HEAD
=======
    const handleTrackSelect = (track, index) => {
        setCurrentTrack(track);
        setCurrentIndex(index);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (playlist.length > 0) {
            const nextIndex = (currentIndex + 1) % playlist.length;
            setCurrentIndex(nextIndex);
            setCurrentTrack(playlist[nextIndex]);
            setIsPlaying(true);
        }
    };

    const handlePrev = () => {
        if (playlist.length > 0) {
            const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            setCurrentIndex(prevIndex);
            setCurrentTrack(playlist[prevIndex]);
            setIsPlaying(true);
        }
    };

>>>>>>> Nov12
    return (
        <div>
            <Header />
            <main>
                <h1>October Playlist</h1>
                <section>
<<<<<<< HEAD
                    <Carousel isEditing={isEditing} />
                </section>
=======
                    <Carousel 
                        isEditing={isEditing}
                        onTrackSelect={handleTrackSelect}
                        onPlaylistLoad={setPlaylist}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                </section>

                <section>
                    <Player 
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                </section>
                
>>>>>>> Nov12
                <button onClick={toggleEdit} className='edit-button'>
                    {isEditing ? "Done" : "Edit"}
                </button>
            </main>
        </div>
    );
}

export default App;
