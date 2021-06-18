import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setSongs, setCurrentSong, isPlaying, setIsPlaying, audioRef, libraryStatus }) => {

    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return <LibrarySong setSongs={setSongs} id={song.id} key={song.id} audioRef={audioRef} song={song} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                })}

            </div>
        </div>
    )
}

export default Library;