package com.hlq.account.entity.user;

import lombok.Data;

import java.io.Serializable;

/**
 * @program: UserToken
 * @description: 用户Token
 * @author: hanLinQi
 * @create: 2021-12-13 14:54
 **/
@Data
public class UserToken implements Serializable {
    private String userId;
    private String token;
    private User user;
}
