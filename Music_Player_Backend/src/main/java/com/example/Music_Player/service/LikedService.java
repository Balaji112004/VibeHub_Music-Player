package com.example.Music_Player.service;

import com.example.Music_Player.model.LikedSong;
import com.example.Music_Player.repository.LikedSongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikedService {

    @Autowired
    private LikedSongRepository repo;

    public String toggleLike(Long userId, Long songId) {
        LikedSong like = repo.findByUserIdAndSongId(userId, songId);

        if (like != null) {
            repo.delete(like);
            return "unliked";
        } else {
            LikedSong newLike = new LikedSong();
            newLike.setUserId(userId);
            newLike.setSongId(songId);
            repo.save(newLike);
            return "liked";
        }
    }
}

