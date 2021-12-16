package com.hlq.account.common.utils;

import com.google.common.collect.ImmutableMap;
import com.hlq.account.common.constants.SecurityConstant;
import com.hlq.account.enums.ResultCode;
import com.hlq.account.exception.BaseException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;

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
@Slf4j
public class JwtTokenUtil {

    /**
     * 生成足够的安全随机密钥，以适合符合规范的签名
     */
    private static final byte[] API_KEY_SECRET_BYTES = DatatypeConverter.parseBase64Binary(SecurityConstant.JWT_SECRET_KEY);
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(API_KEY_SECRET_BYTES);

    /**
     * 生成token版本1
     * @param username
     * @param id
     * @param roles
     * @param isRememberMe
     * @return
     */
    public static String createToken(String username, String id, List<String> roles, boolean isRememberMe) {
        try {
            long expiration = isRememberMe ? SecurityConstant.EXPIRATION_REMEMBER : SecurityConstant.EXPIRATION;
            final Date createdDate = new Date();
            final Date expirationDate = new Date(createdDate.getTime() + expiration * 1000);
            String tokenPrefix = Jwts.builder()
                    .setHeaderParam("type", SecurityConstant.TOKEN_TYPE)
                    .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                    // 不重要的信息放在Claim
                    .claim(SecurityConstant.ROLE_CLAIMS, roles)
                    .setId(id)
                    // JWT签发主体
                    .setIssuer("Hanlinqi")
                    // 签发时间
                    .setIssuedAt(createdDate)
                    // 主体所有人
                    .setSubject(username)
                    // 过期时间
                    .setExpiration(expirationDate)
                    // 生成JWT
                    .compact();
            // 添加 token 前缀 "Bearer "
            return SecurityConstant.TOKEN_PREFIX + tokenPrefix;
        } catch (Exception e) {
            log.error("JWT生成token失败，ERROR | {}", e.getMessage());
            throw new BaseException(ResultCode.GENERATE_JWT_FAILED, null);
        }
    }

    /**
     * 解析token
     * @param token
     * @return
     */
    public static Claims verifyToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY).build()
                    .parseClaimsJws(token).getBody();
            System.out.println(claims.getId());
            System.out.println(claims.getSubject());
            return claims;
        } catch (Exception e) {
            log.error("JWT解析token失败，ERROR | {}", e.getMessage());
            throw new BaseException(ResultCode.VERIFY_JWT_FAILED, ImmutableMap.of("token", token));
        }
    }
}
