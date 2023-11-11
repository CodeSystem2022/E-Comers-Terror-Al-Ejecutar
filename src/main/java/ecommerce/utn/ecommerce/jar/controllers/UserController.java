package ecommerce.utn.ecommerce.jar.controllers;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import ecommerce.utn.ecommerce.jar.models.User;
import ecommerce.utn.ecommerce.jar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/api/user")
    public ResponseEntity<String> saveUser(@RequestBody User user){

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        userService.save(user);
        return ResponseEntity.ok("usuario creado con exitoooo");
    }

    @DeleteMapping("/api/user/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        userService.deleteById(id);
        return ResponseEntity.ok("usuario eliminado con exito");
    }

}
