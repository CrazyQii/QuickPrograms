package com.hlq.account.service;

import com.hlq.account.dto.LoginDto;
import com.hlq.account.dto.SignUpDto;
import com.hlq.account.dto.UserUpdateDto;
import com.hlq.account.entity.user.User;

/**
 * @program: UserService
 * @author: hanLinQi
 * @create: 2021-12-14 17:28
 **/
public interface UserService {

    /**
     * 添加用户数据
     * @param signUpDto 登录用户
     */
    void save(SignUpDto signUpDto);

    /**
     * 通过用户名查找
     * @param username 用户名
     * @return
     */
    User find(String username);

    /**
     * 生成token
     * @param loginDto 登录对象
     * @return token
     */
    String createToken(LoginDto loginDto);

    /**
     * 更新用户
     * @param userUpdateDto
     */
    void update(UserUpdateDto userUpdateDto);
}
