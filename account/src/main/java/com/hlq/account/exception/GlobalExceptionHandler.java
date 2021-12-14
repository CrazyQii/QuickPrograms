package com.hlq.account.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * @Program: GlobalExceptionHandler
 * @Description: 全局异常处理
 * @Author: HanLinqi
 * @Date: 2021/12/15 00:33:30
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException ex, HttpServletRequest request) {
        ErrorResponse response = new ErrorResponse(ex, request.getRequestURI());
        log.error("发生异常 ERROR | {}", response.toString());
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(response);
    }
}
