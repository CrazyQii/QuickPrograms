package com.hlq.account.mapper;

import com.hlq.account.entity.User;
import com.hlq.account.entity.UserToken;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Repository;

/**
 * @Program: UserDao
 * @Description: 用户 Dao 层
 * @Author: HanLinqi
 * @Date: 2021/12/13 00:35:33
 */
@Repository
public interface UserMapper {

    /**
     * 通过Id查找用户
     * @param id 用户Id
     * @return 用户对象
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

    /**
     * 插入用户
     * @param user 用户对象
     */
    @Insert("INSERT INTO tb_user(nick_name, pass_word, open_id, session_key, avatar, register_time, last_login_time, role) " +
            "VALUE(#{nickName}, #{passWord}, #{openId}, #{sessionKey}, #{avatar}, #{registerTime}, #{lastLoginTime}, #{role})")
    void insertUser(User user);

    /**
     * 更新用户
     * @param user 用户对象
     */
    @Update("UPDATE tb_user SET nick_name=#{nickName}, open_id=#{openId}, session_key=#{sessionKey}, " +
            "avatar=#{avatar}, last_login_time=#{lastLoginTime}, role=#{role} WHERE id=#{id}")
    void updateUser(User user);

    /**
     * 通过token查找用户
     * @param token token
     * @return User对象
     */
    @Select("SELECT * FROM tb_user_token WHERE token = #{token}")
    @Results({
            @Result(property = "userId", column = "user_id"),
            @Result(property = "token", column = "token"),
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.hlq.account.mapper.UserMapper.findUserById", fetchType = FetchType.LAZY))
    })
    UserToken findUserByToken(String token);

    /**
     * 插入用户token
     * @param userToken userToken对象
     */
    @Insert("INSERT INTO tb_user_token(user_id, token) VALUE(#{userId}, #{token})")
    void insertUserToken(UserToken userToken);

    /**
     * 更新用户token
     * @param userToken userToken对象
     */
    @Update("UPDATE tb_user_token SET token=#{token} WHERE user_id=#{userId}")
    void updateUserToken(UserToken userToken);
}
