//package com.example.Music_Player.controller;
//
//import com.example.Music_Player.model.LikedSong;
//import com.example.Music_Player.model.Song;
//import com.example.Music_Player.repository.LikedSongRepository;
//import com.example.Music_Player.repository.SongRepository;
//import com.example.Music_Player.service.LikedService;
//import com.example.Music_Player.service.LikedService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@RequestMapping("/api/likes")
//public class LikeController {
//
//    @Autowired
//    private LikedService likeService;
//
//    @Autowired
//    private SongRepository songRepo;
//
//    @Autowired
//    private LikedSongRepository likerepo;
//
//    @PostMapping("/toggle")
//    public ResponseEntity<String> toggleLike(@RequestBody LikedSong req) {
//        String result = likeService.toggleLike(req.getUserId(), req.getSongId());
//        return ResponseEntity.ok(result);
//    }
//
//    @GetMapping("/check")
//    public ResponseEntity<Map<String, Boolean>> checkLike(
//            @RequestParam Long userId,
//            @RequestParam Long songId
//    ) {
//        boolean exists = likerepo.findByUserIdAndSongId(userId, songId) != null;
//
//        Map<String, Boolean> response = new HashMap<>();
//        response.put("liked", exists);
//
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/check-all")
//    public ResponseEntity<List<Long>> checkAllLikes(@RequestParam Long userId) {
//        List<Long> likedSongIds = likerepo.findAllByUserId(userId)
//                .stream()
//                .map(LikedSong::getSongId)
//                .toList();
//
//        return ResponseEntity.ok(likedSongIds);
//    }
//
//    @GetMapping("/{userId}")
//    public ResponseEntity<?> getLikedSongs(@PathVariable Long userId) {
//
//        System.out.println("🔥 HIT /api/likes/" + userId);
//
//        List<LikedSong> likedList = likerepo.findByUserId(userId);
//        System.out.println("Liked rows: " + likedList.size());
//
//        List<Long> songIds = likedList.stream()
//                .map(LikedSong::getSongId)
//                .toList();
//        System.out.println("Song IDs: " + songIds);
//
//        List<Song> songs = songRepo.findAllById(songIds);
//        System.out.println("Fetched songs: " + songs.size());
//
//        return ResponseEntity.ok(songs);
//    }
//
//
//}

package com.example.Music_Player.controller;

import com.example.Music_Player.model.LikedSong;
import com.example.Music_Player.model.Song;
import com.example.Music_Player.repository.LikedSongRepository;
import com.example.Music_Player.repository.SongRepository;
import com.example.Music_Player.service.LikedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikedService likeService;

    @Autowired
    private LikedSongRepository likedRepo;

    @Autowired
    private SongRepository songRepo;

    // ✅ Toggle like/unlike
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleLike(@RequestBody LikedSong req) {
        String result = likeService.toggleLike(req.getUserId(), req.getSongId());
        return ResponseEntity.ok(result);
    }

    // ✅ Check if single song is liked
    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkLike(
            @RequestParam Long userId,
            @RequestParam Long songId
    ) {
        boolean exists = likedRepo.findByUserIdAndSongId(userId, songId) != null;

        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", exists);

        return ResponseEntity.ok(response);
    }

    // ✅ Return only song IDs of liked songs
    @GetMapping("/check-all")
    public ResponseEntity<List<Long>> checkAllLikes(@RequestParam Long userId) {
        List<Long> likedSongIds = likedRepo.findAllByUserId(userId)
                .stream()
                .map(LikedSong::getSongId)
                .toList();

        return ResponseEntity.ok(likedSongIds);
    }

    // 🔥 Main API — return full liked song objects
    // ⭐ NEVER RETURN 404 — always return empty array []
    @GetMapping("/{userId}")
    public ResponseEntity<List<Song>> getLikedSongs(@PathVariable Long userId) {

        System.out.println("🔥 GET /api/likes/" + userId);

        List<LikedSong> likedList = likedRepo.findByUserId(userId);
        System.out.println("Liked rows: " + likedList.size());

        List<Long> songIds = likedList.stream()
                .map(LikedSong::getSongId)
                .toList();
        System.out.println("Song IDs: " + songIds);

        List<Song> songs = songRepo.findAllById(songIds);
        System.out.println("Fetched songs: " + songs.size());

        return ResponseEntity.ok(songs); // never 404
    }
}

