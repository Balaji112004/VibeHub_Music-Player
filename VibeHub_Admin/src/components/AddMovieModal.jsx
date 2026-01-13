import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

function AddMovieModal({ close, refresh }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const[music,setmusic]=useState("");
  const[language,setlanguage]=useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title || !year || !poster) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/admin/movies", {
        title: title.trim(),
        year: Number(year),
        poster: poster.trim(),
        music:music,
        language:language
      });

      refresh();
      close();
    } catch (err) {
      alert("Failed to add movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal close={close}>
      <h2 className="text-xl font-bold mb-4">Add Movie</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Movie Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="w-full border p-2 mb-3"
        placeholder="Release Year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />

            <input
        type="text"
        className="w-full border p-2 mb-3"
        placeholder="Music Director"
        value={music}
        onChange={e => setmusic(e.target.value)}
      />

       <input
        type="text"
        className="w-full border p-2 mb-3"
        placeholder="Language"
        value={language}
        onChange={e => setlanguage(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Poster URL"
        value={poster}
        onChange={e => setPoster(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className={`w-full px-4 py-2 rounded text-white 
          ${loading ? "bg-gray-400" : "bg-green-600"}`}
      >
        {loading ? "Saving..." : "Save Movie"}
      </button>
    </Modal>
  );
}

export default AddMovieModal;
