package com.hlq.account.enums;

import org.springframework.http.HttpStatus;

/**
 * @program: ErrorCode
 * @author: hanLinQi
 * @create: 2021-12-14 17:15
 **/
public enum ErrorCode {
    //
    USER_NAME_ALREADY_EXIST(1001, HttpStatus.BAD_REQUEST, "用户名已经存在"),
    USER_NAME_NOT_FOUND(1002, HttpStatus.NOT_FOUND, "未找到指定用户"),
    VERIFY_JWT_FAILED(1003, HttpStatus.UNAUTHORIZED, "token验证失败"),
    METHOD_ARGUMENT_NOT_VALID(1003, HttpStatus.BAD_REQUEST, "方法参数验证失败");

    private final int code;
    private final HttpStatus status;
    private final String message;

    ErrorCode(int code, HttpStatus status, String message) {
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
