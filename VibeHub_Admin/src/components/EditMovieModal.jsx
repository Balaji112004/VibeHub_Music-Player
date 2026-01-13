import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

function EditMovieModal({ movie, close, refresh }) {
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);
  const [music, setMusic] = useState(movie.music);
  const [poster,setPoster]=useState(movie.poster);
  const [language,setLanguage]=useState(movie.language);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  const updateMovie = async () => {
    try {
      setLoading(true);
      setTitle(title.toLowerCase());
      const payload = {
        title,
        year,
        music,
        poster,
        language
      };

      await axios.put(
        `http://localhost:8080/admin/movies/movieUpdate/${movie.id}`,
        payload
      );

      alert("Movie updated successfully");
      refresh();
      close();
    } catch (err) {
      alert("Failed to update movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal close={close}>
      <h2 className="text-2xl font-bold mb-6">Edit Movie</h2>

      <label className="block mb-2 text-sm opacity-70">Movie Title</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">Release Year</label>
      <input
        type="number"
        className="w-full border border-gray-700 rounded p-2 mb-4"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">Music Director</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-6"
        value={music}
        onChange={(e) => setMusic(e.target.value)}
      />
      
      <label className="block mb-2 text-sm opacity-70">Poster Image</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-6"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />
      
      <label className="block mb-2 text-sm opacity-70">Language</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-6"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <button
        onClick={updateMovie}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded w-full font-semibold"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </Modal>
  );
}

export default EditMovieModal;
