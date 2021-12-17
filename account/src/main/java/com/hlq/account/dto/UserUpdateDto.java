package com.hlq.account.dto;

import lombok.Data;

/**
 * @program: userUpdateDto
 * @description: 更新用户数据
 * @author: hanLinQi
 * @create: 2021-12-17 09:18
 **/
@Data
public class UserUpdateDto {

    private String username;
    private String nickName;
    private String password;
}
