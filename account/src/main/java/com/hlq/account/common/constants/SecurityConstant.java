package com.hlq.account.common.constants;

/**
 * @Program: SecurityConstant
 * @Description: security相关配置常量
 * @Author: HanLinqi
 * @Date: 2021/12/14 23:26:37
 */
public class SecurityConstant {


    /**
     * 系统白名单
     */
    public static final String[] SECURITY_WHITELIST = {
            "/user/sign-up",
            "/user/login"
    };

    public SecurityConstant() {}
}
