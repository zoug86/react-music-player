import React, { useState, useRef } from "react";
import Song from './components/Song';
import Player from './components/Player';
import './styles/app.scss';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPercentage: 0, oldVolumeLevel: 0, volumeLevel: 0.4, isMute: false });
  const [libraryStatus, setLibraryStatus] = useState(false);

  //Handlers
  const audioRef = useRef(null);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animation = Math.round(100 * current / duration);
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
  }

  const songEndHandler = async () => {
    let nextSongIndex = songs.findIndex((song) => song.id === currentSong.id) + 1;
    await setCurrentSong(songs[nextSongIndex % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} songInfo={songInfo} setSongInfo={setSongInfo} setSongs={setSongs} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
