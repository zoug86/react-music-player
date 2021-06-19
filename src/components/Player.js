import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeUp, faVolumeDown, faVolumeOff, faStepForward, faStepBackward, faRandom } from '@fortawesome/free-solid-svg-icons';
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

    const shuffleHandler = async () => {
        //shuffle songs elements
        const randomSongs = songs;
        randomSongs.sort(() => {
            return 0.5 - Math.random();
        })
        currentSong.active = false;
        await setCurrentSong(randomSongs[0]);
        randomSongs.map((song, i) => {
            if (i === 0) {
                song.active = true;
            }
            else {
                song.active = false;
            }
            return song;
        });

        if (isPlaying) audioRef.current.play();
        setSongs(randomSongs);
    }
    const volumeRef = createRef();
    const muteHandle = () => {
        if (!songInfo.isMute) {
            let level = songInfo.volumeLevel;
            //console.log(level);
            volumeRef.current.value = 0;
            audioRef.current.volume = 0;
            setSongInfo({ ...songInfo, oldVolumeLevel: level, volumeLevel: 0, isMute: true });
        } else {
            //console.log(songInfo.oldVolumeLevel);
            volumeRef.current.value = songInfo.oldVolumeLevel;
            audioRef.current.volume = songInfo.oldVolumeLevel;
            setSongInfo({ ...songInfo, oldVolumeLevel: 0, volumeLevel: volumeRef.current.value, isMute: false });
        }
    }

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
                    <FontAwesomeIcon className="skip-back" size="2x" icon={faStepBackward} onClick={() => skipTrackHandler(-1)} />
                    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                    <FontAwesomeIcon className="skip-forward" size="2x" icon={faStepForward} onClick={() => skipTrackHandler(1)} />
                </div>
                <FontAwesomeIcon className="shuffle" icon={faRandom} onClick={shuffleHandler} />
                <div className="volume">
                    <FontAwesomeIcon className="volume-down" size="2x"
                        icon={songInfo.volumeLevel <= 0.01 ? faVolumeOff : songInfo.volumeLevel <= 0.7 ? faVolumeDown : faVolumeUp}
                        onClick={() => muteHandle(songInfo.volumeLevel)} />
                    <input ref={volumeRef} defaultValue={0.4} type="range" min={0} max={1} step={0.01} onChange={dragVolumeHandler} />
                </div>

            </div>
        </div>
    )
}

export default Player;