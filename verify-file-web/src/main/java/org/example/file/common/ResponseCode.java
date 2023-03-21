package org.example.file.common;

/**
 * @program: RespnseCode
 * @description: 枚举类，响应结果提示信息
 **/

public enum ResponseCode {
    SUCCESS("1001", "成功"),
    FILE_NUM_ERROR("1002", "文件上传数量不正确"),
    FILE_VERIFY_ERROR("1003", "文件路径校验失败"),
    FILE_NOT_FOUND("1004", "此路径下没有文件"),
    UNKNOW_EXCEPTION("1005", "未知错误，请联系统管理员");

    private String code;
    private String message;

    ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
