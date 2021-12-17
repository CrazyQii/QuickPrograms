package com.hlq.account.controller;

import com.google.common.collect.ImmutableMap;
import com.hlq.account.common.constants.SecurityConstant;
import com.hlq.account.common.utils.Response;
import com.hlq.account.dto.LoginDto;
import com.hlq.account.dto.SignUpDto;
import com.hlq.account.dto.UserUpdateDto;
import com.hlq.account.entity.user.User;
import com.hlq.account.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: UserController
 * @description: 用户Controller
 * @author: hanLinQi
 * @create: 2021-12-14 17:29
 **/

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<Response<Void>> signUp(@RequestBody SignUpDto signUpDto) {
        log.info("用户注册信息 {}", signUpDto);
        userService.save(signUpDto);
        log.info("注册成功：{}", signUpDto);
        return ResponseEntity.ok().body(new Response<>());
    }

    @PostMapping("/login")
    public ResponseEntity<Response<Void>> login(@RequestBody LoginDto loginDto) {
        log.info("用户登录 {}", loginDto);
        String token = userService.createToken(loginDto);
        log.info("登录成功, token {}", token);
        return ResponseEntity.ok().header(SecurityConstant.TOKEN_HEADER, token).body(new Response<>());
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Void> update(@RequestBody UserUpdateDto userUpdateDto) {
        userService.update(userUpdateDto);
        return ResponseEntity.ok().build();
    }
}
