package com.example.Music_Player.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // Match DB column `src`
    @Column(name = "src")
    private String src;

    // Match DB column `poster`
    @Column(name = "poster")
    private String poster;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    @JsonBackReference
    private Movie movie;

    // New field for MP3 blob
    @Lob
    @Column(name = "song_blob", columnDefinition = "LONGBLOB")
    private byte[] songBlob;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSrc() { return src; }
    public void setSrc(String src) { this.src = src; }

    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }

    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public byte[] getSongBlob() { return songBlob; }
    public void setSongBlob(byte[] songBlob) { this.songBlob = songBlob; }
}
