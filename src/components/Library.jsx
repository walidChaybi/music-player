import React from "react";
import LibrarySong from "./LibrarySong";
function Library({ songs, setCurrentSong, isPlaying, audioRef, libraryState }) {
  return (
    <div className={`library ${libraryState ? "" : "hide"}`}>
      <h2>LIBRARY</h2>
      <div className="library-song">
        {songs.map((song) => {
          return (
            <LibrarySong
              song={song}
              setCurrentSong={setCurrentSong}
              songs={songs}
              key={song.id}
              isPlaying={isPlaying}
              audioRef={audioRef}
              libraryState={libraryState}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Library;
