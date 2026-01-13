package com.example.Music_Player.repository;

import com.example.Music_Player.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByMovieId(Long movieId);

    List<Song> findByMovieIdOrderByIdAsc(Long movieId);
}
