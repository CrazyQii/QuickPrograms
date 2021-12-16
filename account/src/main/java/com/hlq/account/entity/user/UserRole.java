package com.hlq.account.entity.user;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @program: UserRole
 * @description: 用户角色
 * @author: hanLinQi
 * @create: 2021-12-16 10:07
 **/
@Getter
@NoArgsConstructor
@Entity
@Table(name = "USER_ROLE")
public class UserRole implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Role role;

    public UserRole(User user, Role role) {
        this.user = user;
        this.role = role;
    }
}
