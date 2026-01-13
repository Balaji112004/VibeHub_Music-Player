import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blobCache, setBlobCache] = useState({});

  // Load & play song
  const playSong = async (song) => {
    if (!song) return;

    // Prevent same song reload
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    audioRef.current.pause();

    if (blobCache[song.id]) {
      audioRef.current.src = blobCache[song.id];
    } else {
      const res = await axios.get(
        `http://localhost:8080/api/songs/blob/${song.id}`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([res.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setBlobCache((prev) => ({ ...prev, [song.id]: url }));
      audioRef.current.src = url;
    }

    setCurrentSong(song);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // Sync audio events
  useEffect(() => {
    const audio = audioRef.current;

    audio.ontimeupdate = () => setProgress(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration || 0);

    return () => audio.pause();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        playSong,
        togglePlay,
        seek
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
