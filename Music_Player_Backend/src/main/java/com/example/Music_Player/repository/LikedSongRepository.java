package com.example.Music_Player.repository;

import com.example.Music_Player.model.LikedSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikedSongRepository extends JpaRepository<LikedSong, Long> {
    LikedSong findByUserIdAndSongId(Long userId, Long songId);
    List<LikedSong> findByUserId(Long userId);
    List<LikedSong> findAllByUserId(Long userId);
}

