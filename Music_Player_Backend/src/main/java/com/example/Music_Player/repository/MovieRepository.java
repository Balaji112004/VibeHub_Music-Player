package com.example.Music_Player.repository;

//package com.example.musicapp.repository;

import com.example.Music_Player.model.MovieDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Music_Player.model.Movie;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {


    List<Movie> findAllByOrderByYearDesc();

    
    List<Movie> findMovieById(Long movieId);

    @Query("""
SELECT new com.example.Music_Player.model.MovieDTO(
    m.id, m.title, m.year, m.music, m.poster, m.language
)
FROM Movie m
ORDER BY m.year DESC
""")
    List<MovieDTO> findAllMoviesWithoutSongs();

}

