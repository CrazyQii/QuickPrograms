package com.hlq.account.repository.user;

import com.hlq.account.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @Program: UserDao
 * @Description: 用户 Dao 层
 * @Author: HanLinqi
 * @Date: 2021/12/13 00:35:33
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 通过用户名查找用户
     * @param username 用户名
     * @return
     */
    Optional<User> findUserByUsername(String username);

}
