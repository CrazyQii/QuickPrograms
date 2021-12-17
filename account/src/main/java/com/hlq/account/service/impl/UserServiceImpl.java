package com.hlq.account.service.impl;

import com.google.common.collect.ImmutableMap;
import com.hlq.account.common.utils.JwtTokenUtil;
import com.hlq.account.dto.LoginDto;
import com.hlq.account.dto.SignUpDto;
import com.hlq.account.dto.UserUpdateDto;
import com.hlq.account.entity.user.JwtUser;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @Autowired
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
            // 密码加密
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
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
            return userRepository.findUserByUsername(username).orElseThrow(() ->
                    new BaseException(ResultCode.USER_NAME_NOT_FOUND, ImmutableMap.of(USERNAME, username)));
        } catch (BaseException e) {
            log.error("查询用户异常，username:{} ERROR | {}", username , e.getMessage());
            throw new BaseException(e.getErrorCode(), e.getData());
        } catch (Exception e) {
            log.error("查询用户异常，username:{} ERROR | {}", username, e.getMessage());
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.getMessage()));
        }
    }

    @Override
    public String createToken(LoginDto loginDto) {
        try {
            User user = userRepository.findUserByUsername(loginDto.getUsername()).orElseThrow(() ->
                    new BaseException(ResultCode.USER_NAME_NOT_FOUND, ImmutableMap.of(USERNAME, loginDto.getUsername())));
            if (!this.check(loginDto.getPassword(), user.getPassword())) {
                throw new BaseException(ResultCode.PASSWORD_VERIFY_FAILED, null);
            }

            JwtUser jwtUser = new JwtUser(user);
            List<String> authorities = jwtUser.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return JwtTokenUtil.createToken(user.getUsername(), user.getId().toString(), authorities, loginDto.isRememberMe());
        } catch (BaseException e) {
            log.error("创建token异常，username:{} ERROR | {}", loginDto.getUsername() , e.getMessage());
            throw new BaseException(e.getErrorCode(), e.getData());
        } catch (Exception e) {
            log.error("创建token异常，username:{} ERROR | {}", loginDto.getUsername(), e.getMessage());
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.getMessage()));
        }
    }

    @Override
    public void update(UserUpdateDto userUpdateDto) {
        try {
            User user = userRepository.findUserByUsername(userUpdateDto.getUsername()).orElseThrow(() ->
                    new BaseException(ResultCode.USER_NAME_NOT_FOUND, ImmutableMap.of(USERNAME, userUpdateDto.getUsername())));
            if (Objects.nonNull(userUpdateDto.getNickName())) {
                user.setNickName(userUpdateDto.getNickName());
            }
            if (Objects.nonNull(userUpdateDto.getPassword())) {
                user.setPassword(bCryptPasswordEncoder.encode(userUpdateDto.getPassword()));
            }
            userRepository.save(user);
        } catch (BaseException e) {
            log.error("更新用户数据失败，{} ERROR | {}", userUpdateDto , e.getMessage());
            throw new BaseException(e.getErrorCode(), e.getData());
        } catch (Exception e) {
            log.error("更新用户数据失败，{} ERROR | {}", userUpdateDto, e.getMessage());
            throw new BaseException(ResultCode.INTERNET_SERVER_ERROR, ImmutableMap.of(INFO, e.getMessage()));
        }
    }

    /**
     * 校验密码
     * @param currentPassWord 当前密码
     * @param password 数据库密码
     * @return 正误结果
     */
    public boolean check(String currentPassWord, String password) {
        return bCryptPasswordEncoder.matches(currentPassWord, password);
    }
}
