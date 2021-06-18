import React from 'react';
//import { playAudio } from '../utils';


const LibrarySong = ({ song, songs, id, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongs }) => {
    const clickHandle = async () => {
        // console.log(songs);
        await setCurrentSong({ ...song });
        if (isPlaying) isPlaying = false;
        setIsPlaying(!isPlaying);
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        })
        setSongs(newSongs);
        audioRef.current.play();

    }
    return (
        <div className={`library-song ${song.active ? "selected" : ""}`} onClick={clickHandle}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}

export default LibrarySong;