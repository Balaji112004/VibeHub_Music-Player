// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import "./Dragon_home.css";
// import "boxicons/css/boxicons.min.css";

// function PlayerUI({ select2, movie, songs, userId }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [like, setLike] = useState(false);
//   const [blobUrls, setBlobUrls] = useState({});

//   const audioRef = useRef(new Audio());

//   const formatTime = (t) => {
//     if (isNaN(t)) return "00:00";
//     const m = Math.floor(t / 60);
//     const s = Math.floor(t % 60);
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   // 🎵 ========== LOAD SONG WHEN INDEX CHANGES ==========  
// useEffect(() => {
//   if (!songs || songs.length === 0) return;

//   const loadSong = async () => {
//     const song = songs[currentIndex];

//     // stop previous song
//     audioRef.current.pause();

//     // if blob already cached
//     if (blobUrls[song.id]) {
//       audioRef.current.src = blobUrls[song.id];
//       if (isPlaying) audioRef.current.play().catch(console.log);
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/songs/blob/${song.id}`,
//         { responseType: "arraybuffer" }
//       );

//       const blob = new Blob([res.data], { type: "audio/mpeg" });
//       const url = URL.createObjectURL(blob);

//       setBlobUrls((prev) => ({ ...prev, [song.id]: url }));
//       audioRef.current.src = url;

//       if (isPlaying) audioRef.current.play().catch(console.log);
//     } catch (err) {
//       console.log("Error loading song:", err);
//     }
//   };

//   loadSong();

//   audioRef.current.ontimeupdate = () =>
//     setProgress(audioRef.current.currentTime);

//   audioRef.current.onloadedmetadata = () =>
//     setDuration(audioRef.current.duration || 0);

// }, [currentIndex, songs]); // ✅ FIXED


//   // 🎵 ========== PLAY / PAUSE BUTTON FIX ==========  
// const togglePlayPause = async () => {
//   try {
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       await audioRef.current.play();
//       setIsPlaying(true);
//     }
//   } catch (err) {
//     console.log("Play error:", err);
//   }
// };


//   const handleProgressChange = (e) => {
//     audioRef.current.currentTime = e.target.value;
//     setProgress(e.target.value);
//   };

//   // ⭐ Check Like for current song  
//   useEffect(() => {
//     if (!songs || songs.length === 0 || !userId) return;

//     const checkLike = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/likes/check?userId=${userId}&songId=${songs[currentIndex].id}`
//         );
//         setLike(res.data.liked);
//       } catch {
//         setLike(false);
//       }
//     };

//     checkLike();
//   }, [currentIndex, songs, userId]);

//   // Stop audio when closing PlayerUI  
//   useEffect(() => {
//     return () => {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     };
//   }, []);

//   const toggleLikeSong = async () => {
//     if (!userId) return alert("Please login to like songs!");

//     try {
//       const res = await axios.post("http://localhost:8080/api/likes/toggle", {
//         userId,
//         songId: songs[currentIndex].id,
//       });

//       setLike(res.data === "liked");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="">
//       {/* <center>
//         <div className="navv">

//           <h1 className="opacity-100 ml-7 text-3xl mt-2 font-bold lg:opacity-0">
//             {movie.title}
//           </h1>
//         </div>
//       </center> */}

//       <div className="main">
//         {/* LEFT SIDE */}
//         <div className="left">
//           <div className="left_top">
                      
//                       {/*Back Button*/}
        
//             <div className="left1">
//                  <div className="back m-3 " onClick={select2}>
//             <i className="bx bx-arrow-back text-2xl lg:text-4xl in pt-2 rounded-md"></i>
//           </div>
//               <center>
//                 <img src={movie.poster} className="image ml-6" />
//               </center>
//             </div>
//             <div className="left2 pt-10">
//               <center>
//                 <table className="movie ">
//                   <tbody>
//                     <tr>
//                       <td className="font-bold text-6xl pb-7">{movie.title}</td>
//                     </tr>
//                     <tr>
//                       <td>{movie.music}</td>
//                     </tr>
//                     <tr>
//                       <td>{movie.year}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </center>
//             </div>
//           </div>

//           <ol className="songs_list">
//             {songs.map((song, index) => (
//               <li
//                 key={index}
//                 className="flex pl-5 pop"
//                 style={{
//                   color:
//                     currentIndex === index ? "rgb(58, 253, 58)" : "white",
//                 }}
//                 onClick={() => {
//                   setCurrentIndex(index);
//                   setIsPlaying(true); // Auto play when new song selected
//                 }}
//               >
//                 {index + 1}. {song.title}
//               </li>
//             ))}
//           </ol>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="right">
//           <div className="right_top">
//             <center>
//               <img
//                 src={songs[currentIndex]?.poster}
//                 alt=""
//                 id="song_imagee"
//               />
//             </center>

//             <div className="flex justify-around">
//               <marquee className="move">
//                 <h1 className="headi m-2 mt-2 flex text-3xl lg:text-4xl font-bold">
//                   {songs[currentIndex]?.title}
//                 </h1>
//               </marquee>

//               <button className="text-3xl" onClick={toggleLikeSong}>
//                 <i
//                   className={`bx ${
//                     like ? "bxs-heart text-green-500" : "bx-heart text-green-500"
//                   }`}
//                 ></i>
//               </button>
//             </div>
//           </div>

//           <div className="right_bottom">
//             <center>
//               <input
//               className="w-[80%]"
//                 type="range"
//                 value={progress}
//                 max={audioRef.current.duration || 0}
//                 onChange={handleProgressChange}
//               />
//               <div>
//                 <span>{formatTime(progress)}</span> /{" "}
//                 <span>{formatTime(duration)}</span>
//               </div>
//             </center>

//             <div className="controls">
//               <div
//                 className="prev"
//                 onClick={() =>
//                   setCurrentIndex((currentIndex - 1 + songs.length) % songs.length)
//                 }
//               >
//                 <i className="bx bx-skip-previous"></i>
//               </div>

//               <div className="play" onClick={togglePlayPause}>
//                 <i className={`bx ${isPlaying ? "bx-pause" : "bx-play"}`}></i>
//               </div>

//               <div
//                 className="next"
//                 onClick={() =>
//                   setCurrentIndex((currentIndex + 1) % songs.length)
//                 }
//               >
//                 <i className="bx bx-skip-next"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlayerUI;




import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Dragon_home.css";
import "boxicons/css/boxicons.min.css";

function PlayerUI({ select2, movie, userId }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [like, setLike] = useState(false);
  const [blobUrls, setBlobUrls] = useState({});
  const [songs, setSongs] = useState([]);
const [loadingSongs, setLoadingSongs] = useState(true);


  const audioRef = useRef(new Audio());

  const formatTime = (t) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🎵 ========== LOAD SONG WHEN INDEX CHANGES ==========  
useEffect(() => {
  if (!songs || songs.length === 0) return;

  const loadSong = async () => {
    const song = songs[currentIndex];

    // stop previous song
    audioRef.current.pause();

    // if blob already cached
    if (blobUrls[song.id]) {
      audioRef.current.src = blobUrls[song.id];
      if (isPlaying) audioRef.current.play().catch(console.log);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/songs/blob/${song.id}`,
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([res.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setBlobUrls((prev) => ({ ...prev, [song.id]: url }));
      audioRef.current.src = url;

      if (isPlaying) audioRef.current.play().catch(console.log);
    } catch (err) {
      console.log("Error loading song:", err);
    }
  };

  loadSong();

  audioRef.current.ontimeupdate = () =>
    setProgress(audioRef.current.currentTime);

  audioRef.current.onloadedmetadata = () =>
    setDuration(audioRef.current.duration || 0);

}, [currentIndex, songs]); // ✅ FIXED


  // 🎵 ========== PLAY / PAUSE BUTTON FIX ==========  
const togglePlayPause = async () => {
  try {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (err) {
    console.log("Play error:", err);
  }
};


  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  // ⭐ Check Like for current song  
  useEffect(() => {
    if (!songs || songs.length === 0 || !userId) return;

    const checkLike = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/likes/check?userId=${userId}&songId=${songs[currentIndex].id}`
        );
        setLike(res.data.liked);
      } catch {
        setLike(false);
      }
    };

    checkLike();
  }, [currentIndex, songs, userId]);

  // Stop audio when closing PlayerUI  
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
  if (!movie?.id) return;

  const fetchSongs = async () => {
    try {
      setLoadingSongs(true);
      const res = await axios.get(
        `http://localhost:8080/api/movies/${movie.id}/songs`
      );
      setSongs(res.data);
      setCurrentIndex(0);
      setIsPlaying(false);
    } catch (err) {
      console.log("Error fetching songs:", err);
    } finally {
      setLoadingSongs(false);
    }
  };

  fetchSongs();

  // stop audio when movie changes
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
}, [movie?.id]);


  const toggleLikeSong = async () => {
    if (!userId) return alert("Please login to like songs!");

    try {
      const res = await axios.post("http://localhost:8080/api/likes/toggle", {
        userId,
        songId: songs[currentIndex].id,
      });

      setLike(res.data === "liked");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      {/* <center>
        <div className="navv">

          <h1 className="opacity-100 ml-7 text-3xl mt-2 font-bold lg:opacity-0">
            {movie.title}
          </h1>
        </div>
      </center> */}

      <div className="main">
        {/* LEFT SIDE */}
        <div className="left">
          <div className="left_top">
                      
                      {/*Back Button*/}
        
            <div className="left1">
                 <div className="back m-3 " onClick={select2}>
            <i className="bx bx-arrow-back text-2xl lg:text-4xl in pt-2 rounded-md"></i>
          </div>
              <center>
                <img src={movie.poster} className="image ml-6" />
              </center>
            </div>
            <div className="left2 pt-10">
              <center>
                <table className="movie ">
                  <tbody>
                    <tr>
                      <td className="font-bold text-6xl pb-7">{movie.title}</td>
                    </tr>
                    <tr>
                      <td>{movie.music}</td>
                    </tr>
                    <tr>
                      <td>{movie.year}</td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
          </div>

          <ol className="songs_list">
{loadingSongs ? (
  <p className="text-center text-gray-400">Loading songs...</p>
) : (
  <ol className="songs_list">
    {songs.map((song, index) => (
      <li
        key={song.id}
        className="flex pl-5 pop"
        style={{
          color: currentIndex === index ? "rgb(58, 253, 58)" : "white",
        }}
        onClick={() => {
          setCurrentIndex(index);
          setIsPlaying(true);
        }}
      >
        {index + 1}. {song.title}
      </li>
    ))}
  </ol>
)}

          </ol>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <div className="right_top">
            <center>
              <img
                src={songs[currentIndex]?.poster}
                alt=""
                id="song_imagee"
              />
            </center>

            <div className="flex justify-around">
              <marquee className="move">
                <h1 className="headi m-2 mt-2 flex text-3xl lg:text-4xl font-bold">
                  {songs[currentIndex]?.title}
                </h1>
              </marquee>

              <button className="text-3xl" onClick={toggleLikeSong}>
                <i
                  className={`bx ${
                    like ? "bxs-heart text-green-500" : "bx-heart text-green-500"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="right_bottom">
            <center>
              <input
              className="w-[80%]"
                type="range"
                value={progress}
                max={audioRef.current.duration || 0}
                onChange={handleProgressChange}
              />
              <div>
                <span>{formatTime(progress)}</span> /{" "}
                <span>{formatTime(duration)}</span>
              </div>
            </center>

            <div className="controls">
              <div
                className="prev"
                onClick={() =>
                  setCurrentIndex((currentIndex - 1 + songs.length) % songs.length)
                }
              >
                <i className="bx bx-skip-previous"></i>
              </div>

              <div className="play" onClick={togglePlayPause}>
                <i className={`bx ${isPlaying ? "bx-pause" : "bx-play"}`}></i>
              </div>

              <div
                className="next"
                onClick={() =>
                  setCurrentIndex((currentIndex + 1) % songs.length)
                }
              >
                <i className="bx bx-skip-next"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerUI;
