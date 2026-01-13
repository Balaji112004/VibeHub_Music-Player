import React, { useState, useEffect } from "react";
import Smallsong from "./Smallsong";
import SongPlayerUI from "./SongPlayerUI";
import axios from "axios";
import AllSongs from "../assets/All_Songs.png";

function Song() {
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
 const[count,setcount]=useState(1);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Load all songs
useEffect(() => {
  const fetchSongs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/songs");
      console.log(res.data);
      setSongs(res.data);
    } finally {
      setLoading(false);   // stop loading once data arrives
    }
  };
  fetchSongs();
}, []);


  // Load liked songs for user
  useEffect(() => {
    if (!userId) return;
    const fetchLikes = async () => {
const res = await axios.get(
  `http://localhost:8080/api/likes/check-all?userId=${userId}`
);
      // console.log(res.data)
      setLikedSongs(res.data);
    };
    fetchLikes();
  }, [userId]);

  // Toggle like
  const toggleLike = async (songId) => {
    if (!userId) return alert("Please log in first");

    await axios.post("http://localhost:8080/api/likes/toggle", {
      userId,
      songId,
    });

    setLikedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4 bg-black">
      <div className="col-span-5 h-screen overflow-y-auto pr-2 border-r border-gray-700">
        <div className="flex mb-5">
          <img src={AllSongs} height="200px" width="200px" alt="" className="rounded-2xl ml-5" />
          <h1 className="text-white m-7 mt-15 mb-7 pb-8 text-5xl font-bold p-2 bg-black h-[100px] ml-7">
            All Songs
          </h1>
        </div>

{loading ? (
    <center>
      <div className="  min-h-screen">
  <div className="relative">
    <div className="relative w-10 h-10 mt-20">
      
      {/* Outer ring */}
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
        style={{ animationDuration: "3s" }}
      ></div>

      {/* Inner ring */}
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
        style={{ animationDuration: "2s", animationDirection: "reverse" }}
      ></div>

    </div>

    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
  </div>
</div>
    </center>
) : (
  songs.map((song, index) => (
    <Smallsong
      key={song.id}
      id={song.id}
      count={index+1}
      poster={song.poster}
      title={song.title}
      isLiked={likedSongs.includes(song.id)}
      onLike={toggleLike}
      onSelect={() => setSelectedSongIndex(index)}
    />
  ))
)}

      </div>

      <div className="col-span-7">
        {selectedSongIndex !== null ?(
          <SongPlayerUI
            songData={songs}
            startIndex={selectedSongIndex}
            likedSongs={likedSongs}
            toggleLike={toggleLike}
          />
        ):(
                    <div className="flex justify-center items-center h-full text-xl text-gray-400">
            Select a song to play 🎵
          </div>
        )}
      </div>
    </div>
  );
}

export default Song;
