import React from "react";

function Song({ currentSong }) {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="song cover" />
      <h1>{currentSong.artist}</h1>
      <h2>{currentSong.name}</h2>
    </div>
  );
}

export default Song;
