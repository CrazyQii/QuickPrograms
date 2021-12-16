package com.hlq.account.enums;

import lombok.Getter;

/**
 * @program: Role
 * @author: hanLinQi
 * @create: 2021-12-14 11:29
 **/

@Getter
public enum RoleType {
    //
    USER("USER", "用户"),
    TEMP_USER("TEMP_USER", "临时用户"),
    MANAGER("MANAGER", "管理员"),
    ADMIN("ADMIN", "超级管理员");
    private final String name;
    private final String description;

    RoleType(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
