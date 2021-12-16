package com.hlq.account.exception;

import com.hlq.account.common.utils.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


/**
 * @author shuang.kou
 */
@ControllerAdvice
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse<Void>> handleBaseException(BaseException ex, HttpServletRequest request) {
        ErrorResponse<Void> errorResponse = new ErrorResponse<Void>(ex, request.getRequestURI());
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(errorResponse);
    }
}
