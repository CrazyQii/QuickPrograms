package com.hlq.account.mapper;

import com.hlq.account.entity.User;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @Program: UserDao
 * @Description: 用户 Dao 层
 * @Author: HanLinqi
 * @Date: 2021/12/13 00:35:33
 */
public interface UserMapper {

    /**
     * 通过Id查找用户
     * @param id
     * @return
     */
    @Select("SELECT * FROM tb_user WHERE id = #{id}")
    @Results({
            @Result(property = "nickName", column = "nick_name"),
            @Result(property = "openId", column = "open_id"),
            @Result(property = "sessionKey", column = "session_key"),
            @Result(property = "avatar", column = "avatar"),
            @Result(property = "registerTime", column = "register_time"),
            @Result(property = "lastLoginTime", column = "last_login_time"),
            @Result(property = "role", column = "role")
    })
    User findUserById(Long id);
}
