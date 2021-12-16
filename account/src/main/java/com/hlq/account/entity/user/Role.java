package com.hlq.account.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: Role
 * @description: 角色表
 * @author: hanLinQi
 * @create: 2021-12-16 10:08
 **/
@Data
@Entity
@NoArgsConstructor
@Table(name = "ROLE")
public class Role {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<UserRole> roles = new ArrayList<>();

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
