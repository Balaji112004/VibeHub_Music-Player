import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMovieModal from "./AddMovieModal.jsx";
import MovieDetailsAdmin from "./MovieDetailsAdmin.jsx";
import logo from '../assets/lo.png';

function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/movies");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  if (selectedMovieId && selectedMovie) {
    return (
      <MovieDetailsAdmin
        movieId={selectedMovieId}
        movie={selectedMovie}
        goBack={() => {
          setSelectedMovieId(null);
          setSelectedMovie(null);
        }}
      />
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <img src={logo} alt="Logo" className="h-[65px]" />
        <h1 className="text-3xl font-bold">Manage Movies</h1>

        <button
          onClick={() => setShowMovieModal(true)}
          className="bg-green-600 px-4 py-2 rounded"
        >
          + Add Movie
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => {
              setSelectedMovie(movie);
              setSelectedMovieId(movie.id);
            }}
          >
            <img
              src={movie.poster}
              className="rounded-lg h-[350px] w-full object-cover"
              alt={movie.title}
            />
            <div className="mt-2 font-semibold text-xl">{movie.title}</div>
            <div className="text-md opacity-60">{movie.year}</div>
          </div>
        ))}
      </div>

      {/* Add Movie Modal */}
      {showMovieModal && (
        <AddMovieModal
          close={() => setShowMovieModal(false)}
          refresh={fetchMovies}
        />
      )}
    </div>
  );
}

export default AdminMovies;
