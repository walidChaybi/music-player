import React from "react";

function Nav({ libraryState, setLibraryState }) {
  return (
    <nav>
      <h1>DilawPlayer</h1>
      <button onClick={() => setLibraryState(!libraryState)}>Library</button>
    </nav>
  );
}

export default Nav;
