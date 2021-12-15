package com.hlq.account.service.impl;

import com.google.common.collect.ImmutableMap;
import com.hlq.account.entity.User;
import com.hlq.account.enums.ResultCode;
import com.hlq.account.enums.Role;
import com.hlq.account.exception.BaseException;
import com.hlq.account.exception.user.UserNameAlreadyException;
import com.hlq.account.exception.user.UserNameNotFoundException;
import com.hlq.account.mapper.UserMapper;
import com.hlq.account.service.UserService;
import com.hlq.account.vo.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Date;

/**
 * @program: UserServiceImpl
 * @description: 用户service
 * @author: hanLinQi
 * @create: 2021-12-14 17:28
 **/
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 错误信息提示
     */
    private static final String INFO = "info";

    /**
     * 用户名
     */
    private static final String USERNAME = "username";

    @Override
    public void save(UserVo userVo) {
        User user = userMapper.findUserByUsername(userVo.getUserName());
        if (!ObjectUtils.isEmpty(user)) {
            throw new UserNameAlreadyException(ImmutableMap.of(USERNAME, userVo.getUserName()));
        }
        Date date = new Date();
        try {
            user = new User();
            // 创建新的用户
            userVo.setRole(Role.USER.getValue());
            userVo.setRegisterTime(date);
            userVo.setLastLoginTime(date);
            BeanUtils.copyProperties(userVo, user);
            userMapper.insertUser(user);
        } catch (Exception e) {
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.toString()));
        }
    }

    @Override
    public void find(UserVo userVo) {
        User user = userMapper.findUserByUsername(userVo.getUserName());
        if (ObjectUtils.isEmpty(user)) {
            throw new UserNameNotFoundException(ImmutableMap.of(USERNAME, userVo.getUserName()));
        }
        BeanUtils.copyProperties(user, userVo);
    }

}
