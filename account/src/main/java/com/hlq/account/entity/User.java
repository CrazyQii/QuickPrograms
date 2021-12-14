package com.hlq.account.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hlq.account.enums.RoleEnum;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @Program: User
 * @Description: 用户
 * @Author: HanLinqi
 * @Date: 2021/12/13 00:20:17
 */
@Data
public class User {
    private Long id;
    private String nickName;
    private String passWord;
    private String openId;
    private String sessionKey;
    private String avatar;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date registerTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastLoginTime;
    private String role;

}
