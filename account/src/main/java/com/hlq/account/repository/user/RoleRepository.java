package com.hlq.account.repository.user;

import com.hlq.account.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @program: RoleMapper
 * @author: hanLinQi
 * @create: 2021-12-16 10:25
 **/
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * 通过名称查找Role
     * @param name role名称
     * @return
     */
    Optional<Role> findRoleByName(String name);

}
