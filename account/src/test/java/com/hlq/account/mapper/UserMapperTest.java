package com.hlq.account.mapper;

import com.hlq.account.entity.User;
import com.hlq.account.entity.UserToken;
import com.hlq.account.enums.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class UserMapperTest {

    @Autowired
    private UserMapper userMapper;


    @Test
    void findUser() {
        User user = userMapper.findUserById(1L);
        System.out.println(user);
        UserToken token = userMapper.findUserByToken("qnfyg");
        System.out.println(token);
    }

    @Test
    void updateUser() {
        Date date = new Date();
//        User user = userMapper.findUserById(2L);
        User user = new User();
        user.setId(1L);
        user.setUserName("hlq");
        user.setRole(Role.ADMIN.getValue());
        user.setLastLoginTime(date);
        userMapper.updateUser(user);
    }

    @Test
    void insertUser() {
        User user = userMapper.findUserById(1L);
        Date date = new Date();
        user.setLastLoginTime(date);
        user.setRegisterTime(date);
        userMapper.insertUser(user);
    }
}