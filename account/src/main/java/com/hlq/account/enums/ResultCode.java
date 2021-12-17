package com.hlq.account.enums;

import org.springframework.http.HttpStatus;

/**
 * @program: ErrorCode
 * @author: hanLinQi
 * @create: 2021-12-14 17:15
 **/
public enum ResultCode {
    //
    SUCCESS(1000, HttpStatus.OK, "成功"),
    INTERNET_SERVER_ERROR(1001, HttpStatus.INTERNAL_SERVER_ERROR, "服务器端异常"),
    GENERATE_JWT_FAILED(1002, HttpStatus.UNAUTHORIZED, "token生成失败"),
    VERIFY_JWT_FAILED(1003, HttpStatus.UNAUTHORIZED, "token验证失败"),
    METHOD_ARGUMENT_NOT_VALID(1004, HttpStatus.BAD_REQUEST, "方法参数验证失败"),
    ROLE_NOT_FOUND(1005, HttpStatus.NOT_FOUND, "未找到角色权限"),
    USER_NAME_ALREADY_EXIST(2001, HttpStatus.BAD_REQUEST, "用户名已经存在"),
    USER_NAME_NOT_FOUND(2002, HttpStatus.NOT_FOUND, "未找到指定用户"),
    PASSWORD_VERIFY_FAILED(2003, HttpStatus.BAD_REQUEST, "密码错误"),
    UPDATE_USER_FAILED(2004, HttpStatus.BAD_REQUEST, "修改用户信息失败");

    private final int code;
    private final HttpStatus status;
    private final String message;

    ResultCode(int code, HttpStatus status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
