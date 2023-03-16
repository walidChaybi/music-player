import React from "react";
import { playAudio } from "../util";
function LibrarySong({ song, songs, setCurrentSong, isPlaying, audioRef }) {
  const selectHandler = (id) => {
    songs.map((song) => {
      song.active = false;
      return song.id === id;
    });
    song.active = true;
    setCurrentSong(song);
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={() => selectHandler(song.id)}
      className={song.active ? "songs selected" : "songs"}
    >
      <img src={song.cover} alt="song cover" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
