import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SongPlayerUI({ songData, startIndex, likedSongs, toggleLike }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blobUrls, setBlobUrls] = useState({}); // cache blob URLs
  const [songChanged, setSongChanged] = useState(false); // track song change

  const audioRef = useRef(new Audio());

  const currentSong = songData[currentIndex];
  const userLiked = likedSongs.includes(currentSong?.id);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Update currentIndex when startIndex changes
  useEffect(() => {
    if (startIndex !== undefined && startIndex !== null) {
      setCurrentIndex(startIndex);
      setIsPlaying(true); // auto-play new song
      setSongChanged(true);
    }
  }, [startIndex]);

    useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = ""; // optional: release memory
    };
  }, []);

  // Load song blob when currentIndex changes
// Inside the useEffect for loading song
useEffect(() => {
  if (!currentSong) return;

  audioRef.current.pause();
  audioRef.current.currentTime = 0;

  const loadBlob = async () => {
    let url;
    if (blobUrls[currentSong.id]) {
      url = blobUrls[currentSong.id];
    } else {
      const res = await axios.get(
        `http://localhost:8080/api/songs/blob/${currentSong.id}`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([res.data], { type: "audio/mpeg" });
      url = URL.createObjectURL(blob);
      setBlobUrls((prev) => ({ ...prev, [currentSong.id]: url }));
    }

    audioRef.current.src = url;

    // Set duration when metadata is loaded
    const handleLoaded = () => {
      setDuration(audioRef.current.duration || 0);
      audioRef.current.removeEventListener("loadedmetadata", handleLoaded);

audioRef.current.play()
  .then(() => setIsPlaying(true))
  .catch(err => console.log("Autoplay failed:", err));

    };

    audioRef.current.addEventListener("loadedmetadata", handleLoaded);
  };

  loadBlob();

  audioRef.current.ontimeupdate = () => setProgress(audioRef.current.currentTime);
}, [currentIndex, currentSong]);




  // Play/pause
// togglePlay stays the only place controlling play/pause
const togglePlay = () => {
  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current.play().catch(console.log);
    setIsPlaying(true);
  }
};


  // Progress bar drag
  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  // Prev/Next
  const handlePrev = () =>
    setCurrentIndex((prev) => {
      setSongChanged(true);
      return (prev - 1 + songData.length) % songData.length;
    });

  const handleNext = () =>
    setCurrentIndex((prev) => {
      setSongChanged(true);
      return (prev + 1) % songData.length;
    });

  return (
    <div className="bg-black p-4 rounded-xl text-white h-full">
      <center>
        <img
          src={currentSong?.poster}
          alt=""
          className="w-[300px] h-[300px] object-cover rounded-xl mb-1 mt-8"
        />
      </center>

      <center>
        <div className="flex justify-between w-[500px]">
          <marquee className="w-[400px]">
            <h1 className="text-5xl font-bold py-8">{currentSong?.title}</h1>
          </marquee>

          <button
            onClick={() => toggleLike(currentSong?.id)}
            className="text-4xl my-4 mt-8"
          >
            {userLiked ? (
              <i className="bx bxs-heart text-green-500"></i>
            ) : (
              <i className="bx bx-heart text-green-500"></i>
            )}
          </button>
        </div>
      </center>

      <center>
        <input
          type="range"
          className="w-[450px]"
          value={progress}
          max={duration}
          onChange={handleProgressChange}
        />
        <div>
          <span className="text-lg">{formatTime(progress)}</span> /{" "}
          <span className="text-lg">{formatTime(duration)}</span>
        </div>
      </center>

      <div className="flex justify-center gap-5 text-[45px]">
        <i className="bx bx-skip-previous cursor-pointer prev" onClick={handlePrev}></i>
        <i
          className={`bx ${isPlaying ? "bx-pause" : "bx-play"} cursor-pointer play text-[52px]`}
          onClick={togglePlay}
        ></i>
        <i className="bx bx-skip-next cursor-pointer next" onClick={handleNext}></i>
      </div>
    </div>
  );
}

export default SongPlayerUI;
