package com.example.Music_Player.model;

public class LoginRequest {

    private String mobile;
    private String password;

    // Required empty constructor
    public LoginRequest() {}

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
