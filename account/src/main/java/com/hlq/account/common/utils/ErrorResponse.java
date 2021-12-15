package com.hlq.account.common.utils;

import com.hlq.account.common.utils.Response;
import com.hlq.account.enums.ResultCode;
import com.hlq.account.exception.BaseException;
import lombok.*;
import org.springframework.util.ObjectUtils;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * @Program: ErrorResponse
 * @Description: 错误响应
 * @Author: HanLinqi
 * @Date: 2021/12/15 00:34:30
 */
@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse<T> extends Response<T> implements Serializable {

    private String path;
    private final HashMap<String, Object> errorDetail = new HashMap<>();


    public ErrorResponse(BaseException ex, String path) {
        this(ex.getErrorCode().getCode(), ex.getErrorCode().getStatus().value(), ex.getErrorCode().getMessage(), path, ex.getData());
    }

    public ErrorResponse(ResultCode resultCode, String path) {
        this(resultCode.getCode(), resultCode.getStatus().value(), resultCode.getMessage(), path, null);
    }

    public ErrorResponse(ResultCode resultCode, String path, Map<String, Object> errorDetail) {
        this(resultCode.getCode(), resultCode.getStatus().value(), resultCode.getMessage(), path, errorDetail);
    }

    private ErrorResponse(int code, int status, String message, String path, Map<String, Object> errorDetail) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = Instant.now();
        if (!ObjectUtils.isEmpty(errorDetail)) {
            this.errorDetail.putAll(errorDetail);
        }
    }
}