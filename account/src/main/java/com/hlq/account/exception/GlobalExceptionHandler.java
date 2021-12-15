package com.hlq.account.exception;

import com.hlq.account.common.utils.ErrorResponse;
import com.hlq.account.exception.user.UserNameAlreadyException;
import com.hlq.account.exception.user.UserNameNotFoundException;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse<Void>> handleBaseException(BaseException ex, HttpServletRequest request) {
        ErrorResponse<Void> errorResponse = new ErrorResponse<Void>(ex, request.getRequestURI());
        log.error("发生未知异常: {}", errorResponse);
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(errorResponse);
    }

    @ExceptionHandler(UserNameAlreadyException.class)
    public ResponseEntity<ErrorResponse<Void>> handleUserNameAlreadyExistException(
            UserNameAlreadyException ex, HttpServletRequest request) {
        ErrorResponse<Void> errorResponse = new ErrorResponse<Void>(ex, request.getRequestURI());
        log.error("用户名已经存在：{}", errorResponse);
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(errorResponse);
    }

    @ExceptionHandler(UserNameNotFoundException.class)
    public ResponseEntity<ErrorResponse<Void>> handleUserNameNotFoundException(
            UserNameNotFoundException ex, HttpServletRequest request) {
        ErrorResponse<Void> errorResponse = new ErrorResponse<Void>(ex, request.getRequestURI());
        log.error("用户名不存在：{}", errorResponse);
        return ResponseEntity.status(ex.getErrorCode().getStatus()).body(errorResponse);
    }

}
