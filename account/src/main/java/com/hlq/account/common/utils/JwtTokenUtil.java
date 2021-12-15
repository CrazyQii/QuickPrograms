package com.hlq.account.common.utils;

import com.hlq.account.common.constants.SecurityConstant;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.List;

/**
 * @Program: JwtTokenUtil
 * @Description: Jwt相关工具
 * @Author: HanLinqi
 * @Date: 2021/12/15 23:39:42
 */
public class JwtTokenUtil {

    /**
     * 生成足够的安全随机密钥，以适合符合规范的签名
     */
    private static final byte[] API_KEY_SECRET_BYTES = DatatypeConverter.parseBase64Binary(SecurityConstant.JWT_SECRET_KEY);
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(API_KEY_SECRET_BYTES);

    public static String createToken(String username, String id, List<String> roles, boolean isRememberMe) {
        long expiration = isRememberMe ? SecurityConstant.EXPIRATION_REMEMBER : SecurityConstant.EXPIRATION;
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expiration * 1000);
        String tokenPrefix = Jwts.builder()
                .setHeaderParam("type", SecurityConstant.TOKEN_TYPE)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .claim(SecurityConstant.ROLE_CLAIMS, roles)
                .setId(id)
                .setIssuer("Hanlinqi")
                .setIssuedAt(createdDate)
                .setSubject(username)
                .setExpiration(expirationDate)
                .compact();
        // 添加 token 前缀 "Bearer "
        return SecurityConstant.TOKEN_PREFIX + tokenPrefix;
    }
}
