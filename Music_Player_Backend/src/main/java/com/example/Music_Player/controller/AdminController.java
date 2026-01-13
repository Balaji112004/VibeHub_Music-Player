package com.example.Music_Player.controller;

import com.example.Music_Player.model.Movie;
import com.example.Music_Player.model.Song;
import com.example.Music_Player.repository.MovieRepository;
import com.example.Music_Player.repository.SongRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminController {
    private final SongRepository songRepo;
    private final MovieRepository movieRepo;

    public AdminController(SongRepository songRepo, MovieRepository movieRepo) {
        this.songRepo = songRepo;
        this.movieRepo = movieRepo;
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepo.findAllByOrderByYearDesc();
    }

    @GetMapping("/movies/{movieId}")
    public List<Movie> getMoviesById(@PathVariable Long movieId) {
        return movieRepo.findMovieById(movieId);
    }

    @GetMapping("/movies/{movieId}/songs")
    public List<Song> getSongsByMovie(@PathVariable Long movieId) {
        return songRepo.findByMovieId(movieId);
    }

    @PostMapping("/movies")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepo.save(movie);
    }

    @PutMapping("/songs/{songId}")
    public ResponseEntity<?> updateSong(
            @PathVariable Long songId,
            @RequestParam String title,
            @RequestParam(required = false) String poster,
            @RequestParam(required = false) MultipartFile songFile
    ) throws IOException {

        Song song = songRepo.findById(songId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Song not found"));

        // Always update title
        song.setTitle(title);

        // Update poster ONLY if provided
        if (poster != null && !poster.isBlank()) {
            song.setPoster(poster);
        }


        // Update blob ONLY if new file is provided
        if (songFile != null && !songFile.isEmpty()) {
            song.setSongBlob(songFile.getBytes());
        }

        songRepo.save(song);

        return ResponseEntity.ok("Song updated successfully");
    }

    @DeleteMapping("/songs/delete/{songId}")
    public ResponseEntity<?> deleteSong(@PathVariable Long songId) {

        Song song = songRepo.findById(songId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Song not found"));

        songRepo.delete(song);

        return ResponseEntity.ok("Song deleted successfully");
    }


    @PostMapping("songs")
    public Song addSong(
            @RequestParam String title,
            @RequestParam(required = false) String poster,
            @RequestParam MultipartFile songFile,
            @RequestParam Long movieId
    ) throws IOException {

        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Song song = new Song();
        song.setTitle(title);
        song.setPoster(poster);
        song.setMovie(movie);
        song.setSongBlob(songFile.getBytes()); // or path if storing in filesystem

        return songRepo.save(song);
    }

    @PutMapping("/movies/movieUpdate/{movieId}")
    public ResponseEntity<Movie> updateMovieDetails(
            @RequestBody Movie movie,
            @PathVariable Long movieId) {

        Movie movieDetails = movieRepo.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        movieDetails.setTitle(movie.getTitle());
        movieDetails.setYear(movie.getYear());
        movieDetails.setPoster(movie.getPoster());
        movieDetails.setMusic(movie.getMusic());
        movieDetails.setLanguage(movie.getLanguage());

        Movie updatedMovie = movieRepo.save(movieDetails);

        return ResponseEntity.ok(updatedMovie);
    }

}
