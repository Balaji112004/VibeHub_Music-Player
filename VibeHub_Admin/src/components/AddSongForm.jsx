import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

function AddSongForm({ movieId, close, refresh }) {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title || !songFile) {
      alert("Song title and file are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("poster", poster);
      formData.append("songFile", songFile);
      formData.append("movieId", movieId);

      await axios.post("http://localhost:8080/admin/songs", formData);

      alert("Song added successfully");
      refresh();
      close();
    } catch (err) {
      alert("Failed to add song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal close={close}>
      <h2 className="text-2xl font-bold mb-6">Add Song</h2>

      <label className="block mb-2 text-sm opacity-70">Song Title</label>
      <input className="w-full border border-gray-700 rounded p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">Poster URL</label>
      <input className="w-full border border-gray-700 rounded p-2 mb-4"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">
        Song File
      </label>
      <input type="file" accept="audio/*"
        className="w-full border border-gray-700 rounded p-2 mb-6"
        onChange={(e) => setSongFile(e.target.files[0])}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 w-full py-2 rounded font-semibold"
      >
        {loading ? "Saving..." : "Add Song"}
      </button>
    </Modal>
  );
}

export default AddSongForm;
