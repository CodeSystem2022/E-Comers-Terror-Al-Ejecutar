package ecommerce.utn.ecommerce.jar.service;

import ecommerce.utn.ecommerce.jar.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //GET ALL
    List<User> findAll();
    //GET BY ID
    Optional<User> findById(Long id);
    //POST
    void save(User user);

    void deleteById(Long id);
}
