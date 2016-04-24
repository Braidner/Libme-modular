package org.libme.auth.repository;

import org.libme.auth.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Braidner
 */
@Repository
public interface UserRepository extends CrudRepository<User, String> {
}
