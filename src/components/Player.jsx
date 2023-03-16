import React, { useState } from "react";
import { playAudio } from "../util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/_player.scss";
function Player({
  song,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setCurrentSong,
}) {
  //audio Ref
  //const audioRef = useRef(null);
  // Audio Play handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipSongHandler = (direction) => {
    let currentIndex = song.findIndex((s) => {
      return s.id === currentSong.id;
    });
    song[currentIndex].active = false;
    if (direction === "next") {
      setCurrentSong(song[(currentIndex + 1) % song.length]);
      song[(currentIndex + 1) % song.length].active = true;
      playAudio(isPlaying, audioRef);
    } else if (direction === "previous") {
      if (currentIndex === 0) currentIndex = song.length;
      setCurrentSong(song[currentIndex - 1]);
      song[currentIndex - 1].active = true;
      playAudio(isPlaying, audioRef);
    }
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const songInfoHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // animation precentage for the colored progress bar

    const animation = (current / duration) * 100;
    setSongInfo({
      currentTime: current,
      duration: duration,
      animation: animation,
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Stats
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animation: 0,
  });
  // style for the colored track animation
  const trackAnimation = {
    transform: `translateX(${songInfo.animation}%)`,
  };
  // image for the range input slider
  const sliderBackground = {
    backgroundImage: `url(${currentSong.cover})`,
    filter: `blur(6px)`,
    backgroundPosition: `top -10% right -10%`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div className="track">
          <input
            style={sliderBackground}
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          ></input>
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : ""}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("previous")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler("next")}
          className="skin-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onEnded={() => skipSongHandler("next")}
        onLoadedMetadata={songInfoHandler}
        onTimeUpdate={songInfoHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default Player;
