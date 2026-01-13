import React, { useState, useEffect } from "react";
import "./home.css";
import PlayerUI from "./PlayerUI";
import Footer from "./Footer";
import { useUser } from "../context/UserContext";
import { useMovies } from "../context/MovieContext";

function Home() {
  const [home, setHome] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { user } = useUser();
  const { movies, loading } = useMovies(); // ✅ from context

  // Filter movies when language or movies change
  useEffect(() => {
    if (selectedLanguage === "all") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) => movie.language?.toLowerCase() === selectedLanguage
      );
      setFilteredMovies(filtered);
    }
  }, [movies, selectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  function select(movie) {
    setSelectedMovie(movie);
    setHome(false);
  }

  function select2() {
    setHome(true);
  }

  // ================= HOME VIEW =================
  if (home) {
    return (
      <div className="bg-black">
        <div className="text-white">
          {/* Header */}
          <div className="flex justify-between">
            <div className="font-bold text-4xl m-3 p-5 pt-10 pb-10 pop mt-0">
              Recent Hits
            </div>

            {/* Language Dropdown */}
            <div>
              <select
                className="mt-10 mb-10 bg-gray-600 p-2 rounded-xl w-[180px] mr-[100px]"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="all">All</option>
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
                <option value="malayalam">Malayalam</option>
                <option value="telugu">Telugu</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <center className="min-h-screen flex items-center justify-center">
              <div className="relative w-10 h-10">
                <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"></div>
                <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin reverse"></div>
              </div>
            </center>
          ) : filteredMovies.length === 0 ? (
            <center className="min-h-screen">
              <p className="opacity-50">No movies found</p>
            </center>
          ) : (
            <div className="flex flex-wrap ml-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id}>
                  <img
                    src={movie.poster}
                    className="h-[250px] w-[250px] ml-[65px] lg:h-[300px] lg:w-[300px] lg:ml-10 rounded-xl mb-3 cursor-pointer"
                    alt={movie.title}
                    onClick={() => select(movie)}
                  />
                  <div className="ml-[65px] font-bold text-2xl lg:ml-11">
                    {movie.title}
                  </div>
                  <div className="ml-[65px] opacity-50 lg:ml-11 mb-5">
                    {movie.year}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Footer />
        </div>
      </div>
    );
  }

  // ================= PLAYER VIEW =================
  return (
    <div className="bg-black text-white text-center p-5 lg:p-10 lg:pt-0">
      <PlayerUI
        select2={select2}
        movie={selectedMovie}
        songs={selectedMovie.songs}
        userId={user?.id}
      />
    </div>
  );
}

export default Home;
