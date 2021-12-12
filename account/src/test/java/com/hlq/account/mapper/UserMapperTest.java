package com.hlq.account.mapper;

import com.hlq.account.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    void findUserById() {
        User user = userMapper.findUserById(1L);
        System.out.println(user);
    }
}