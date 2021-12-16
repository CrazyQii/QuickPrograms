package com.hlq.account.config;

import com.hlq.account.common.constants.SecurityConstant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * @program: SecurityConfig
 * @description:
 * @author: hanLinQi
 * @create: 2021-12-14 19:38
 **/
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                // 禁用csrf
                .csrf().disable()
                .authorizeRequests()
                // 指定接口放行
                .antMatchers(HttpMethod.POST, SecurityConstant.SECURITY_WHITELIST).permitAll()
                // 其他接口需要认证
                .anyRequest().authenticated()
                .and()
                // 不创建Session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
