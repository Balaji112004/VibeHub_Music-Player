package com.example.Music_Player.controller;

import com.example.Music_Player.model.Movie;
import com.example.Music_Player.model.MovieDTO;
import com.example.Music_Player.model.Song;
import com.example.Music_Player.repository.MovieRepository;
import com.example.Music_Player.repository.SongRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})

public class MusicController {

    private final SongRepository songRepo;
    private final MovieRepository movieRepo;

    public MusicController(SongRepository songRepo, MovieRepository movieRepo) {
        this.songRepo = songRepo;
        this.movieRepo = movieRepo;
    }

    // 🔹 Get all movies
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepo.findAllByOrderByYearDesc();
    }


    @GetMapping("/movies/only")
    public List<MovieDTO> getAllMoviesOnly() {
        return movieRepo.findAllMoviesWithoutSongs();
    }


    @GetMapping("/movies/{movieId}/songs")
    public List<Song> getSongsByMovieId(
            @PathVariable Long movieId) {

        return songRepo.findByMovieIdOrderByIdAsc(movieId);
    }


    // 🔹 Get all songs
    @GetMapping("/songs")
    public List<Song> getAllSongs() {
        return songRepo.findAll();
    }

    // 🔹 Get songs for a specific movie
//    @GetMapping("/movies/{movieId}/songs")
//    public List<Song> getSongsByMovie(@PathVariable Long movieId) {
//        return songRepo.findByMovieId(movieId);
//    }

    // 🔹 Add song to a movie
    @PostMapping("/movies/{movieId}/songs")
    public Song addSong(@PathVariable Long movieId, @RequestBody Song song) {
        return movieRepo.findById(movieId).map(movie -> {
            song.setMovie(movie);
            return songRepo.save(song);
        }).orElseThrow(() -> new RuntimeException("Movie not found!"));
    }

    @PostMapping("/songs/update-blob")
    public ResponseEntity<String> updateSongBlob(
            @RequestParam Long songId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            // Fetch song by ID
            Song song = songRepo.findById(songId)
                    .orElseThrow(() -> new RuntimeException("Song not found"));

            // Update blob
            song.setSongBlob(file.getBytes());

            // Save changes
            songRepo.save(song);

            return ResponseEntity.ok("Song blob updated successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to read file: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/songs/blob/{id}")
    public ResponseEntity<Resource> getSongBlob(@PathVariable Long id) {
        Song song = songRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        ByteArrayResource resource = new ByteArrayResource(song.getSongBlob());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + song.getTitle() + ".mp3\"")
                .body(resource);
    }

}
