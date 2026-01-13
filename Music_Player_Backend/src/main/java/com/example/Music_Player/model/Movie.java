//package com.example.Music_Player.model;
//
////package com.example.musicapp.model;
//
//import jakarta.persistence.*;
//import java.util.List;
//
//@Entity
//public class Movie {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private int year;
//    private String music;
//    private String poster;
//
//    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
//    private List<Song> songs;
//
//    // Getters & setters
//}


package com.example.Music_Player.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int year;




    // ✅ Match DB column `music`
    private String music;

    // ✅ Match DB column `poster`
    private String poster;

//    private Date releaseDate;
    private String language;

    // ✅ One Movie → Many Songs
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Song> songs = new ArrayList<>();

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getMusic() { return music; }
    public void setMusic(String music) { this.music = music; }

    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }

    public List<Song> getSongs() { return songs; }
    public void setSongs(List<Song> songs) { this.songs = songs; }

//    public Date getReleaseDate() {
//        return releaseDate;
//    }
//
//    public void setReleaseDate(Date releaseDate) {
//        this.releaseDate = releaseDate;
//    }
public String getLanguage() {
    return language;
}

    public void setLanguage(String language) {
        this.language = language;
    }   
}
