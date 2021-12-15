package com.hlq.account.exception.user;

import com.hlq.account.enums.ResultCode;
import com.hlq.account.exception.BaseException;

import java.util.Map;

/**
 * @program: UserNameAlreadyException
 * @description: 用户名已经存在异常
 * @author: hanLinQi
 * @create: 2021-12-15 13:50
 **/

public class UserNameAlreadyException extends BaseException {
    public UserNameAlreadyException(Map<String, Object> data) {
        super(ResultCode.USER_NAME_ALREADY_EXIST, data);
    }
}
