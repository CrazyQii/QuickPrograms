package com.hlq.account.entity;

import lombok.Data;

/**
 * @program: UserToken
 * @description: 用户Token
 * @author: hanLinQi
 * @create: 2021-12-13 14:54
 **/
@Data
public class UserToken {
    private String userId;
    private String token;
    private User user;
}
