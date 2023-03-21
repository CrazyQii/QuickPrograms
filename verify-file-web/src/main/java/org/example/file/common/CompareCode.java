package org.example.file.common;

/**
 * @program: CompareEnum
 * @description: 枚举类，文件校验提示信息
 **/
public enum CompareCode {
    ALL_SAME(ResponseCode.SUCCESS.getCode(), 100, "文本内容完全一致"),
    PART_SAME(ResponseCode.SUCCESS.getCode(),80, "文本内容大部分相似"),
    HALF_SAME(ResponseCode.SUCCESS.getCode(),50, "文本内容部分相似"),
    NOT_SAME(ResponseCode.SUCCESS.getCode(),0, "文本不一致");

    private String code;
    private Integer compareCode;
    private String message;


    CompareCode(String code, Integer compareCode, String message) {
        this.code = code;
        this.compareCode = compareCode;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getCompareCode() {
        return compareCode;
    }

    public void setCompareCode(Integer compareCode) {
        this.compareCode = compareCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
