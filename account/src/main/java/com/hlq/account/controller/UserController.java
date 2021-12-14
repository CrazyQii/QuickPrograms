package com.hlq.account.controller;

import com.hlq.account.service.UserService;
import com.hlq.account.vo.UserVo;
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
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody UserVo userVo) {
        userService.save(userVo);
        return ResponseEntity.ok().build();
    }
}
