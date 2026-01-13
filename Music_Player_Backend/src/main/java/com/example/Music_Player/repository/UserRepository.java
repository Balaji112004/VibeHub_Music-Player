package com.example.Music_Player.repository;

import com.example.Music_Player.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByMobile(String mobile);
}
