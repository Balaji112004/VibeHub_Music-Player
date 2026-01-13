package com.example.Music_Player.model;

public class MovieDTO {
    private Long id;
    private String title;
    private int year;
    private String music;
    private String poster;
    private String language;

    // constructor
    public MovieDTO(Long id, String title, int year, String music, String poster, String language) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.music = music;
        this.poster = poster;
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getMusic() {
        return music;
    }

    public void setMusic(String music) {
        this.music = music;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
// getters
}
