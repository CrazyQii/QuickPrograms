package com.hlq.account.enums;

/**
 * @program: Role
 * @author: hanLinQi
 * @create: 2021-12-14 11:29
 **/
public enum RoleEnum {
    /**
     * 管理员
     */
    ADMIN("admin", "管理员"),
    /**
     * 普通用户
     */
    USER("user", "普通用户");

    private final String value;
    private final String message;

    RoleEnum(String value, String message) {
        this.value = value;
        this.message = message;
    }

    public String getValue() {
        return value;
    }

    public String getMessage() {
        return message;
    }
}
