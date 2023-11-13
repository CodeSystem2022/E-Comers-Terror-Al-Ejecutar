package ecommerce.utn.ecommerce.jar.repository;

import ecommerce.utn.ecommerce.jar.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);
}
