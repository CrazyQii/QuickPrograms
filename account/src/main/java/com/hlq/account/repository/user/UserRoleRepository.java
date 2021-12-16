package com.hlq.account.repository.user;

import com.hlq.account.entity.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @program: UserRoleRepository
 * @author: hanLinQi
 * @create: 2021-12-16 14:00
 **/
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}
