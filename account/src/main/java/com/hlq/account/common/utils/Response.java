package com.hlq.account.common.utils;

import com.hlq.account.enums.ResultCode;
import lombok.Data;

import javax.annotation.Nullable;
import java.io.Serializable;
import java.time.Instant;

/**
 * @program: Response
 * @description: 正确响应结果
 * @author: hanLinQi
 * @create: 2021-12-15 16:47
 **/
@Data
public class Response<T> implements Serializable {
    protected int code;
    protected int status;
    protected String message;
    protected Instant timestamp;
    private T data;

    public Response() {
        this.code = ResultCode.SUCCESS.getCode();
        this.status = ResultCode.SUCCESS.getStatus().value();
        this.message = ResultCode.SUCCESS.getMessage();
        this.timestamp = Instant.now();
    }

    public Response(T data) {
        this.code = ResultCode.SUCCESS.getCode();
        this.status = ResultCode.SUCCESS.getStatus().value();
        this.message = ResultCode.SUCCESS.getMessage();
        this.timestamp = Instant.now();
        this.data = data;
    }
}
