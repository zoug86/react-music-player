import React from 'react';
import LibrarySong from './LibrarySong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import data from '../data';

const Library = ({ songs, setSongs, setCurrentSong, isPlaying, setIsPlaying, audioRef, libraryStatus }) => {
    const ResetLibraryHandler = () => {
        songs = data();
        setSongs(songs);
    }
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <div className="library-reset">
                <h2>Library</h2>
                <button onClick={ResetLibraryHandler}>
                    <FontAwesomeIcon icon={faRedo} />
                </button>
            </div>

            <div className="library-songs">
                {songs.map(song => {
                    return <LibrarySong setSongs={setSongs} id={song.id} key={song.id} audioRef={audioRef} song={song} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                })}

            </div>
        </div>
    )
}

export default Library;