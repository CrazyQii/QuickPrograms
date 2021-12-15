package com.hlq.account.exception.user;

import com.hlq.account.enums.ResultCode;
import com.hlq.account.exception.BaseException;

import java.util.Map;

/**
 * @program: UserNotFoundException
 * @description: 找不到用户异常
 * @author: hanLinQi
 * @create: 2021-12-15 14:57
 **/

public class UserNameNotFoundException extends BaseException {
    public UserNameNotFoundException(Map<String, Object> data) {
        super(ResultCode.USER_NAME_NOT_FOUND, data);
    }
}
