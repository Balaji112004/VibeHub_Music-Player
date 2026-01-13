import React, { useState } from "react";

export default function PlaySongBlob() {
  const [songId, setSongId] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [message, setMessage] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!songId) {
      setMessage("Please enter a song ID!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/songs/blob/${songId}`);
      if (!response.ok) {
        throw new Error("Song not found or error fetching song");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob); // Create a temporary URL for audio
      setAudioUrl(url);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setAudioUrl(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Play Song Blob</h2>
      <form onSubmit={handleFetch} style={styles.form}>
        <input
          type="number"
          placeholder="Enter Song ID"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Fetch & Play</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {audioUrl && (
        <div style={styles.audioContainer}>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { width: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" ,color:"white"},
  input: { padding: "8px", width: "80%", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" },
  message: { marginTop: "10px", color: "red", fontWeight: "bold" },
  audioContainer: { marginTop: "20px" },
};
