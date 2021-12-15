package com.hlq.account.exception;

import com.hlq.account.enums.ResultCode;
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

    private final ResultCode resultCode;
    private final transient HashMap<String, Object> data = new HashMap<>();

    public BaseException(ResultCode resultCode, Map<String, Object> data) {
        super(resultCode.getMessage());
        this.resultCode = resultCode;
        if (!ObjectUtils.isEmpty(data)) {
            this.data.putAll(data);
        }
    }

    public BaseException(ResultCode resultCode, Map<String, Object> data, Throwable cause) {
        super(resultCode.getMessage(), cause);
        this.resultCode = resultCode;
        if (!ObjectUtils.isEmpty(data)) {
            this.data.putAll(data);
        }
    }

    public ResultCode getErrorCode() {
        return resultCode;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
