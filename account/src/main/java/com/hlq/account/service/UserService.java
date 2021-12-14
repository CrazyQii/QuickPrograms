package com.hlq.account.service;

import com.hlq.account.vo.UserVo;

/**
 * @program: UserService
 * @author: hanLinQi
 * @create: 2021-12-14 17:28
 **/
public interface UserService {

    /**
     * 添加用户数据
     * @param userVo 用户Vo
     */
    void save(UserVo userVo);
}
