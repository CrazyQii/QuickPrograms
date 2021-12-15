package com.hlq.account.vo;

import lombok.Data;

import java.util.Date;

/**
 * @program: UserVo
 * @description: 用户Vo对象
 * @author: hanLinQi
 * @create: 2021-12-14 18:51
 **/
@Data
public class UserVo {
    private Long id;
    private String userName;
    private String nickName;
    private String passWord;
    private String openId;
    private String sessionKey;
    private String avatar;
    private Date registerTime;
    private Date lastLoginTime;
    private String role;
}
