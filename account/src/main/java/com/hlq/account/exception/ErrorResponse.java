package com.hlq.account.exception;

import com.hlq.account.enums.ErrorCode;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Program: ErrorResponse
 * @Description: 错误响应
 * @Author: HanLinqi
 * @Date: 2021/12/15 00:34:30
 */
@Data
public class ErrorResponse {

    private int code;
    private int status;
    private String message;
    private String path;
    private String timestamp;
    private final HashMap<String, Object> errorDetail = new HashMap<>();

    private final SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public ErrorResponse(BaseException ex, String path) {
        this(ex.getErrorCode().getCode(), ex.getErrorCode().getStatus().value(), ex.getErrorCode().getMessage(), path, ex.getData());
    }

    public ErrorResponse(ErrorCode code, String path, Map<String, Object> errorDetail) {
        this(code.getCode(), code.getStatus().value(), code.getMessage(), path, errorDetail);
    }

    private ErrorResponse(int code, int status, String message, String path, Map<String, Object> errorDetail) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = timeFormat.format(new Date());
        if (!ObjectUtils.isEmpty(errorDetail)) {
            this.errorDetail.putAll(errorDetail);
        }
    }
}
