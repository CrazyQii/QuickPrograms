package com.hlq.account.exception;

import com.hlq.account.enums.ErrorCode;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: BaseException
 * @description:
 * @author: hanLinQi
 * @create: 2021-12-14 17:14
 **/

public class BaseException extends RuntimeException {

    private final ErrorCode errorCode;
    private final transient HashMap<String, Object> data = new HashMap<>();

    public BaseException(ErrorCode errorCode, Map<String, Object> data) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        if (!ObjectUtils.isEmpty(data)) {
            this.data.putAll(data);
        }
    }

    public BaseException(ErrorCode errorCode, Map<String, Object> data, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.errorCode = errorCode;
        if (!ObjectUtils.isEmpty(data)) {
            this.data.putAll(data);
        }
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
