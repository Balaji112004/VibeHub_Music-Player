import React, { useEffect, useState } from "react";
import axios from "axios";
import Smallsong from "./Smallsong";
import SongPlayerUI from "./SongPlayerUI";
import AllSongs from "../assets/All_Songs.png";

// import { useUser } from "../context/UserContext";

export default function Liked() {
  // Get logged-in user safely
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

const [isLoading, setIsLoading] = useState(false);

const[count,setcount]=useState(1);

  const [likedSongs, setLikedSongs] = useState([]);
  const [playerStartIndex, setPlayerStartIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [likedIds, setLikedIds] = useState([]);

  // Fetch all liked songs + liked IDs list
  const fetchLikedSongs = async () => {
    if (!userId) {
      // console.error("Log in first");
      // alert("Please log in to view liked songs!")
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/api/likes/${userId}`);
      console.log(res.data);
      setLikedSongs(res.data);

      const idRes = await axios.get(
        `http://localhost:8080/api/likes/check-all?userId=${userId}`
      );
      setLikedIds(idRes.data);
    } catch (e) {
      console.error("Error loading liked songs", e);
    }
  };

  // Load on page start & whenever userId changes
  useEffect(() => {
    fetchLikedSongs();
    setIsLoading(false);
  }, [userId]);

  // Heart toggle like/unlike
  const toggleLike = async (songId) => {
    try {
      await axios.post("http://localhost:8080/api/likes/toggle", {
        userId,
        songId,
      });

      fetchLikedSongs(); // refresh left list
    } catch (e) {
      console.error("Error toggling like", e);
    }
  };

  return (
    <div className="flex text-white h-full">

      {/* LEFT SIDE — LIKED SONG LIST */}
<div className="w-[40%] bg-black p-4 m-4 mr-0 overflow-y-auto rounded-lg">
  <div className="flex mb-10">
    <img
      src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
      height="200"
      width="200"
      alt=""
      className="rounded-2xl ml-5"
    />
    <h1 className="text-white mt-20 pb-4 text-5xl font-bold p-2 bg-black h-[100px] ml-5">
      Liked Songs
    </h1>
  </div>

  {/* 1️⃣ User not logged in */}
  {!userId ? (
    <div className="flex justify-center items-center h-[60vh]">
      <p className="text-gray-400 text-xl font-medium">
        Please log in first to see your liked songs
      </p>
    </div>

  ) : isLoading ? (
    /* 2️⃣ Logged in but loading */
    <div className="flex justify-center items-center h-[60vh]">
      <div className="relative w-10 h-10">
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

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
      </div>
    </div>

  ) : likedSongs.length === 0 ? (
    /* 3️⃣ Logged in but no liked songs */
    <div className="flex justify-center items-center h-[60vh]">
      <p className="text-gray-400 text-lg">
        You haven’t liked any songs yet
      </p>
    </div>

  ) : (
    /* 4️⃣ Songs available */
    likedSongs.map((song, index) => (
      
      <div>
        
              <Smallsong
        key={song.id}
        id={song.id}
        count={index + 1}
        poster={song.poster}
        title={song.title}
        isLiked={likedIds.includes(song.id)}
        onLike={toggleLike}
        onSelect={() => {
          setPlayerStartIndex(index);
          setShowPlayer(true);
        }}
      />
      {/* {setcount(count+1)} */}
      </div>
    ))
  )}
</div>


      {/* RIGHT SIDE — PLAYER */}
      <div className="w-[60%] bg-[#111] p-4">
        {showPlayer && likedSongs.length > 0 ? (
<SongPlayerUI
  key={playerStartIndex} 
  songData={likedSongs}
  startIndex={playerStartIndex}
  likedSongs={likedIds}
  toggleLike={toggleLike}
/>

        ) : (
          <div className="flex justify-center items-center h-full text-xl text-gray-400">
            Select a song to play 🎵
          </div>
        )}
      </div>
    </div>
  );
}
