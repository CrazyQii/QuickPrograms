package com.hlq.account.service.impl;

import com.google.common.collect.ImmutableMap;
import com.hlq.account.dto.LoginDto;
import com.hlq.account.dto.SignUpDto;
import com.hlq.account.entity.user.Role;
import com.hlq.account.entity.user.User;
import com.hlq.account.entity.user.UserRole;
import com.hlq.account.enums.ResultCode;
import com.hlq.account.enums.RoleType;
import com.hlq.account.exception.BaseException;
import com.hlq.account.repository.user.RoleRepository;
import com.hlq.account.repository.user.UserRepository;
import com.hlq.account.repository.user.UserRoleRepository;
import com.hlq.account.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String USERNAME = "username";
    private static final String INFO = "info";
    private static final String ROLE = "role";

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void save(SignUpDto signUpDto) {
        User user = new User();
        Date date = new Date();
        try {
            boolean exist = userRepository.findUserByUsername(signUpDto.getUsername()).isPresent();
            if (exist) {
                throw new BaseException(ResultCode.USER_NAME_ALREADY_EXIST,
                        ImmutableMap.of(USERNAME, signUpDto.getUsername()));
            }
            BeanUtils.copyProperties(signUpDto, user);
            // 创建新的用户
//            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRegisterTime(date);
            user.setLastLoginTime(date);
            userRepository.save(user);
            // 绑定角色权限
            Role role = roleRepository.findRoleByName(RoleType.ADMIN.getName()).orElseThrow(() ->
                    new BaseException(ResultCode.ROLE_NOT_FOUND, ImmutableMap.of(ROLE, RoleType.ADMIN)));
            UserRole userRole = new UserRole(user, role);
            userRoleRepository.save(userRole);
        } catch (BaseException e) {
            log.error("创建用户异常，{} ERROR | {}", signUpDto , e.getMessage());
            throw new BaseException(e.getErrorCode(), e.getData());
        } catch (Exception e) {
            log.error("创建用户未知异常，{} ERROR | {}", signUpDto ,e.getMessage());
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.getMessage()));
        }
    }

    @Override
    public User find(String username) {
        try {
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new BaseException(ResultCode.USER_NAME_NOT_FOUND, ImmutableMap.of(USERNAME, username)));
            return user;
        } catch (BaseException e) {
            log.error("查询用户异常，username:{} ERROR | {}", username , e.getMessage());
            throw new BaseException(e.getErrorCode(), e.getData());
        } catch (Exception e) {
            log.error("查询用户异常，username:{} ERROR | {}", username, e.getMessage());
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.getMessage()));
        }
    }
//
    @Override
    public String createToken(LoginDto loginDto) {
//        User user = userRepository.findUserByUsername(loginDto.getUserName());
//        if (ObjectUtils.isEmpty(user)) {
//            throw new BaseException(ResultCode.USER_NAME_NOT_FOUND, ImmutableMap.of(USERNAME, loginDto.getUserName()));
//        }
////        if (!this.check(loginDto.getPassWord(), user.getPassWord())) {
////            throw new BadCredentialsException("密码不正确");
////        }
        return null;
    }
//
//    /**
//     * 校验密码
//     * @param currentPassWord 当前密码
//     * @param password 数据库密码
//     * @return 正误结果
//     */
//    public boolean check(String currentPassWord, String password) {
//        return this.bCryptPasswordEncoder.matches(currentPassWord, password);
//    }
}
