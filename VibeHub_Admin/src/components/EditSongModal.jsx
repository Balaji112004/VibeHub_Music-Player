import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

function EditSongModal({ song, close, refresh }) {
  const [title, setTitle] = useState(song.title);
  const [poster, setPoster] = useState(song.poster);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(song);
  }, [song]);

const updateSong = async () => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);

    if (poster) {
      formData.append("poster", poster);
    }

    if (file instanceof File) {
      formData.append("songFile", file); // ✅ FIXED
    }

    await axios.put(
      `http://localhost:8080/admin/songs/${song.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    alert("Song updated successfully");
    refresh();
    close();
  } catch (err) {
    alert("Failed to update song");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal close={close}>
      <h2 className="text-2xl font-bold mb-6">Edit Song</h2>

      <label className="block mb-2 text-sm opacity-70">Song Title</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">Poster URL</label>
      <input
        className="w-full border border-gray-700 rounded p-2 mb-4"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />

      <label className="block mb-2 text-sm opacity-70">
        Replace Song File (optional)
      </label>
      <input
        type="file"
        accept="audio/*"
        className="w-full border border-gray-700 rounded p-2 mb-6"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={updateSong}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded w-full font-semibold"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </Modal>
  );
}

export default EditSongModal;
