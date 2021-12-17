package com.hlq.account.filter;

import com.hlq.account.common.constants.SecurityConstant;
import com.hlq.account.common.utils.JwtTokenUtil;
import com.hlq.account.enums.ResultCode;
import com.hlq.account.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @program: JWTFilter
 * @description: jwt过滤器
 * @author: hanLinQi
 * @create: 2021-12-17 10:26
 **/
@Slf4j
public class JwtFilter extends BasicAuthenticationFilter {


    public JwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    public JwtFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint) {
        super(authenticationManager, authenticationEntryPoint);
    }

    /**
     * 过滤检验
     * @param request
     * @param response
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        // 校验请求头的token
        String token = request.getHeader(SecurityConstant.TOKEN_HEADER);
        if (token == null || !token.startsWith(SecurityConstant.TOKEN_PREFIX)) {
            SecurityContextHolder.clearContext();
            chain.doFilter(request, response);
            return;
        }
        String tokenValue = token.replace(SecurityConstant.TOKEN_PREFIX, "");
        try {
//            String previousToken = JwtTokenUtil.verifyToken(tokenValue);
            System.out.println(token);
        } catch (Exception e) {
            log.error("token校验失败");
            throw new BaseException(ResultCode.VERIFY_JWT_FAILED, null);
        }
     }
}
