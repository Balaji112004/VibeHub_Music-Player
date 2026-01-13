import React, { useEffect, useState } from "react";
import axios from "axios";
import EditSongModal from "./EditSongModal.jsx";
import AddSongForm from "./AddSongForm.jsx";
import EditMovieModal from "./EditMovieModal.jsx";

function MovieDetailsAdmin({ movieId, movie, goBack }) {
  const [songs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddSong, setShowAddSong] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, [movieId]);

  const fetchSongs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/movies/${movieId}/songs`
      );
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching songs", err);
    }
  };

  const deleteSong = async (songId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this song?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:8080/admin/songs/delete/${songId}`
    );

    alert("Song deleted successfully");

    setSelectedIndex(0);
    fetchSongs();
  } catch (err) {
    console.error(err);
    alert("Failed to delete song");
  }
};


  return (
    <div className="bg-black min-h-screen text-white">

      {/* TOP NAV */}
      <div className="flex items-center p-6">
        <button onClick={goBack} className="text-2xl mr-4 ">
          <i class='bx bx-arrow-back text-2xl p-3 text-black bg-white  rounded-full' ></i>
        </button>
        {/* <h1 className="text-3xl font-bold">{movie.title}</h1> */}
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row px-6 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:w-2/3">

          {/* MOVIE INFO */}
          <div className="flex gap-6 mb-8">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-72 h-72 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
              <p className="opacity-70 text-lg mb-1">Year : {movie.year}</p>
              {movie.music && (
                <p className="opacity-70 text-lg mb-4">Music : {movie.music}</p>
              )}
              <button className="p-2 px-3 bg-green-600 rounded-lg" 
              onClick={() => setEditingMovie(movie)}
>Edit Movie Details</button>
            </div>
          </div>

          {/* SONGS HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Songs</h2>
            <button
              onClick={() => setShowAddSong(true)}
              className="bg-green-600 px-4 py-2 rounded font-semibold"
            >
              + Add Song
            </button>
          </div>

          {/* SONGS LIST */}
          <ol className="space-y-3">
            {songs.map((song, index) => (
              <li
                key={song.id}
                className={`flex justify-between items-center px-4 py-3 rounded cursor-pointer
                  ${
                    selectedIndex === index
                      ? "bg-green-600/20 text-green-400"
                      : "hover:bg-white/10"
                  }`}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="font-medium text-xl">
                  {index + 1}. {song.title}
                </span>
              </li>
            ))}
          </ol>

          {songs.length === 0 && (
            <p className="opacity-60 mt-6">No songs found for this movie.</p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/3">
          {songs[selectedIndex] && (
            <div className="bg-white/5 p-6 rounded-lg">
              <img
                src={songs[selectedIndex].poster}
                alt=""
                className="w-full h-[400px] w-full object-cover rounded mb-4"
              />

              <h3 className="text-2xl font-bold mb-2">
                {songs[selectedIndex].title}
              </h3>

              <p className="opacity-70 mb-4">
                {songs[selectedIndex].artist}
              </p>

              <button
                onClick={() => setEditingSong(songs[selectedIndex])}
                className="bg-green-600 w-full py-2 rounded font-semibold"
              >
                Edit This Song
              </button>

                            <button
                onClick={() =>deleteSong(songs[selectedIndex].id)}
                className="bg-red-600 w-full mt-3 py-2 rounded font-semibold"
              >
                Delete This Song
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADD SONG MODAL */}
{showAddSong && (
  <AddSongForm
    movieId={movieId}
    close={() => setShowAddSong(false)}
    refresh={fetchSongs}
  />
)}


      {/* EDIT SONG MODAL */}
      {editingSong && (
        <EditSongModal
          song={editingSong}
          close={() => setEditingSong(null)}
          refresh={fetchSongs}
        />
        
      )}

      {editingMovie && (
        <EditMovieModal
          movie={movie}
          close={() => setEditingMovie(null)}
          refresh={() => {}}

        />
      )}
    </div>
  );
}

export default MovieDetailsAdmin;
