import React, { useState } from "react";

export default function UpdateSongBlob() {
  const [songId, setSongId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an MP3 file!");
      return;
    }

    const formData = new FormData();
    formData.append("songId", songId);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/songs/update-blob", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Song Blob</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Song ID</label>
        <input
          type="number"
          placeholder="Enter Song ID"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Select MP3 File</label>
        <input
          type="file"
          accept=".mp3"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={styles.inputFile}
        />

        <button type="submit" style={styles.button}>Upload</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginTop: "10px",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  inputFile: {
    marginBottom: "15px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#007bff",
  },
};
