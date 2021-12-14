package com.hlq.account.service.impl;

import com.hlq.account.entity.User;
import com.hlq.account.enums.Role;
import com.hlq.account.mapper.UserMapper;
import com.hlq.account.service.UserService;
import com.hlq.account.vo.UserVo;
import javafx.beans.property.adapter.JavaBeanBooleanProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @program: UserServiceImpl
 * @description: 用户service
 * @author: hanLinQi
 * @create: 2021-12-14 17:28
 **/
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void save(UserVo userVo) {
        validUserName(userVo.getUserName());
        // 1.
        // 创建新的用户
//        Date date = new Date();
//        userVo.setRole(Role.ADMIN.getValue());
//        userVo.setRegisterTime(date);
//        userVo.setLastLoginTime(date);
//
//
//        userMapper.insertUser();

    }

    /**
     * 验证用户名合法性
     * @param username username
     */
    private void validUserName(String username) {
        User user = userMapper.findUserByUsername(username);
        System.out.println(user);
    }
}
