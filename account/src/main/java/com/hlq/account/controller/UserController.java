package com.hlq.account.controller;

import com.hlq.account.common.utils.Response;
import com.hlq.account.dto.LoginDto;
import com.hlq.account.dto.SignUpDto;
import com.hlq.account.service.UserService;
import com.hlq.account.vo.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(signUpDto, userVo);
        userService.save(userVo);
        return ResponseEntity.ok().body(new Response<>());
    }

    @PostMapping("/login")
    public ResponseEntity<Response<UserVo>> login(@RequestBody LoginDto loginDto) {
        log.info("用户登录 {}", loginDto);
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(loginDto, userVo);
        userService.find(userVo);
        return ResponseEntity.ok().body(new Response<>(userVo));
    }
}
