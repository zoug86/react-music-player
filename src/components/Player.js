import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faVolumeUp, faVolumeDown } from '@fortawesome/free-solid-svg-icons';
//import { playAudio } from '../utils';

const Player = ({ songs, currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, setCurrentSong, setSongs }) => {

    //Event Handlers:
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        })
        setSongs(newSongs);
    }
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const timeFormat = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        //console.log(audio.volume);
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const dragVolumeHandler = (e) => {
        audioRef.current.volume = e.target.value;
        //console.log(e.target.value)
        setSongInfo({ ...songInfo, volumeLevel: e.target.value });
    }

    const skipTrackHandler = async (step) => {
        let nextSongIndex = songs.findIndex((song) => song.id === currentSong.id) + step;
        const nextSong = songs[nextSongIndex !== -1 ? nextSongIndex % songs.length : songs.length - 1];
        activeLibraryHandler(nextSong);
        await setCurrentSong(nextSong);
        if (isPlaying) audioRef.current.play();

    };

    // Add Styles:
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{timeFormat(songInfo.currentTime)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler} />
                    <div style={trackAnim} className="animate-track">

                    </div>
                </div>

                <p>{songInfo.duration ? timeFormat(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <div className="controls">
                    <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipTrackHandler(-1)} />
                    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                    <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => skipTrackHandler(1)} />
                </div>

                <div className="volume">
                    <FontAwesomeIcon className="volume-down" size="2x" icon={faVolumeDown} />
                    <input defaultValue={0.5} type="range" min={0} max={1} step={0.01} onChange={dragVolumeHandler} />
                    <FontAwesomeIcon className="volume-up" size="2x" icon={faVolumeUp} />
                </div>

            </div>
        </div>
    )
}

export default Player;