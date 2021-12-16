package com.hlq.account.repository;

import com.hlq.account.entity.user.User;
import com.hlq.account.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@Slf4j
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findUser() {
        Optional<User> user = userRepository.findUserByUsername("tqhet");
        System.out.println(user.get());
    }
}